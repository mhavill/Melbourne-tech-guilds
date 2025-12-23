"""
Meetup Photo Downloader (with Login)
Downloads all photos from a Meetup group's photo albums

Requirements:
- Python 3.7+
- selenium library
- Chrome browser

Install requirements:
pip install selenium

Download ChromeDriver:
https://chromedriver.chromium.org/downloads
(Must match your Chrome version)

Usage:
1. Update the GROUP_URL with your Meetup group URL
2. Run the script: python meetup_photo_downloader.py
3. Script will open browser - log in manually when prompted
4. Photos will be saved to ./meetup_photos/
"""

import os
import json
import time
from datetime import datetime
from urllib.parse import urlparse, urljoin
import requests

try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.chrome.options import Options
except ImportError:
    print("ERROR: Selenium not installed!")
    print("Install it with: pip install selenium")
    exit(1)

# ===== CONFIGURATION =====
GROUP_URL = "https://www.meetup.com/melbourne-raspberry-jam/"  # UPDATE THIS!
DOWNLOAD_FOLDER = "meetup_photos"
DELAY_BETWEEN_REQUESTS = 2  # seconds
LOGIN_WAIT_TIME = 60  # seconds to wait for manual login

# ===== SETUP =====
def setup_download_folder():
    """Create download folder if it doesn't exist"""
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
        print(f"✓ Created folder: {DOWNLOAD_FOLDER}")
    return DOWNLOAD_FOLDER

def sanitize_filename(filename):
    """Remove invalid characters from filename"""
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        filename = filename.replace(char, '_')
    # Limit length
    if len(filename) > 200:
        filename = filename[:200]
    return filename

def download_image(img_url, save_path, cookies=None):
    """Download a single image"""
    try:
        session = requests.Session()
        if cookies:
            for cookie in cookies:
                session.cookies.set(cookie['name'], cookie['value'])
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = session.get(img_url, headers=headers, stream=True, timeout=30)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"  ✗ Error downloading: {e}")
        return False

def setup_driver():
    """Setup Chrome WebDriver"""
    print("\n🌐 Setting up browser...")
    
    chrome_options = Options()
    # Don't use headless mode - we need to see login
    chrome_options.add_argument('--start-maximized')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    
    try:
        driver = webdriver.Chrome(options=chrome_options)
        print("✓ Browser started")
        return driver
    except Exception as e:
        print(f"\n✗ ERROR: Could not start Chrome WebDriver")
        print(f"   {e}")
        print("\nTroubleshooting:")
        print("1. Make sure Chrome browser is installed")
        print("2. Download ChromeDriver from:")
        print("   https://chromedriver.chromium.org/downloads")
        print("3. Place chromedriver.exe in same folder as this script")
        print("   OR add it to your system PATH")
        return None

def login_to_meetup(driver):
    """Navigate to Meetup and wait for user to log in"""
    print("\n🔐 Opening Meetup login page...")
    print("=" * 60)
    print("PLEASE LOG IN TO MEETUP IN THE BROWSER WINDOW")
    print("=" * 60)
    print(f"You have {LOGIN_WAIT_TIME} seconds to log in")
    print("After logging in, the script will continue automatically")
    print()
    
    driver.get("https://www.meetup.com/login/")
    
    # Wait for user to log in
    # Check if we're logged in by looking for user-specific elements
    start_time = time.time()
    logged_in = False
    
    while time.time() - start_time < LOGIN_WAIT_TIME:
        # Check if login was successful (URL changes or specific element appears)
        current_url = driver.current_url
        
        # If redirected away from login page, probably logged in
        if 'login' not in current_url.lower():
            logged_in = True
            break
        
        # Check for common logged-in indicators
        try:
            # Look for user menu or profile elements
            driver.find_element(By.CSS_SELECTOR, "[data-testid='navbarAccount']")
            logged_in = True
            break
        except:
            pass
        
        time.sleep(2)
        remaining = int(LOGIN_WAIT_TIME - (time.time() - start_time))
        if remaining % 10 == 0:
            print(f"  Waiting for login... ({remaining}s remaining)")
    
    if logged_in:
        print("✓ Login detected!")
        time.sleep(2)
        return True
    else:
        print("✗ Login timeout - continuing anyway (may fail)")
        return False

def scroll_to_load_images(driver):
    """Scroll page to load lazy-loaded images"""
    last_height = driver.execute_script("return document.body.scrollHeight")
    
    for _ in range(5):  # Scroll multiple times
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

def get_photo_albums(driver, group_url):
    """Find all photo album URLs"""
    print("\n🔍 Searching for photo albums...")
    
    photos_url = urljoin(group_url, "photos/")
    driver.get(photos_url)
    time.sleep(3)
    
    scroll_to_load_images(driver)
    
    # Find album links
    album_links = set()
    
    try:
        # Look for links containing album IDs or photo references
        links = driver.find_elements(By.TAG_NAME, "a")
        
        for link in links:
            href = link.get_attribute("href")
            if href and ("photos" in href or "albums" in href):
                if group_url.split('/')[-2] in href:  # Group name in URL
                    album_links.add(href)
    
    except Exception as e:
        print(f"  Warning: {e}")
    
    # Always include main photos page
    album_links.add(photos_url)
    
    album_list = list(album_links)
    print(f"✓ Found {len(album_list)} photo page(s) to process")
    
    return album_list

def download_photos_from_page(driver, page_url, album_name, cookies):
    """Download all photos from a single page"""
    print(f"\n📷 Processing: {album_name}")
    
    try:
        driver.get(page_url)
        time.sleep(3)
        
        # Scroll to load all images
        scroll_to_load_images(driver)
        
        # Find all image elements
        images = driver.find_elements(By.TAG_NAME, "img")
        
        photo_urls = set()
        for img in images:
            src = img.get_attribute("src") or img.get_attribute("data-src")
            
            # Filter for actual photo URLs (not icons, avatars, etc.)
            if src and any(domain in src for domain in ['secure.meetupstatic.com', 'photos.meetupstatic.com']):
                # Try to get highest resolution
                # Remove size parameters if present
                if '?' in src:
                    base_src = src.split('?')[0]
                else:
                    base_src = src
                
                # Skip tiny thumbnails
                if 'thumb' not in base_src.lower() and '/48/' not in base_src:
                    photo_urls.add(base_src)
        
        photo_list = list(photo_urls)
        print(f"  Found {len(photo_list)} photo(s)")
        
        if not photo_list:
            print("  ⚠ No photos found on this page")
            return 0
        
        # Create album folder
        album_folder = os.path.join(DOWNLOAD_FOLDER, sanitize_filename(album_name))
        os.makedirs(album_folder, exist_ok=True)
        
        # Download each photo
        downloaded = 0
        for idx, photo_url in enumerate(photo_list, 1):
            # Create filename
            filename = os.path.basename(urlparse(photo_url).path)
            if not filename or len(filename) > 100:
                ext = 'jpg'
                if '.' in photo_url:
                    ext = photo_url.split('.')[-1].split('?')[0]
                filename = f"photo_{idx:04d}.{ext}"
            
            save_path = os.path.join(album_folder, filename)
            
            # Skip if exists
            if os.path.exists(save_path):
                print(f"  ⊙ [{idx}/{len(photo_list)}] Skipped (exists): {filename}")
                continue
            
            print(f"  ↓ [{idx}/{len(photo_list)}] Downloading: {filename}")
            
            if download_image(photo_url, save_path, cookies):
                downloaded += 1
            
            time.sleep(DELAY_BETWEEN_REQUESTS)
        
        return downloaded
        
    except Exception as e:
        print(f"  ✗ Error processing page: {e}")
        return 0

def save_metadata(albums_processed, total_downloaded):
    """Save download metadata"""
    metadata = {
        'download_date': datetime.now().isoformat(),
        'group_url': GROUP_URL,
        'albums_processed': albums_processed,
        'total_photos': total_downloaded
    }
    
    metadata_path = os.path.join(DOWNLOAD_FOLDER, '_download_metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\n✓ Metadata saved")

def main():
    """Main execution"""
    print("=" * 60)
    print("MEETUP PHOTO DOWNLOADER (WITH LOGIN)")
    print("=" * 60)
    
    # Validate configuration
    if "YOUR-GROUP-NAME-HERE" in GROUP_URL:
        print("\n✗ ERROR: Please update GROUP_URL in the script!")
        print("   Change 'YOUR-GROUP-NAME-HERE' to your actual group name")
        print("   Example: https://www.meetup.com/Melbourne-Raspberry-Pi/")
        return
    
    print(f"\nGroup URL: {GROUP_URL}")
    
    # Setup
    setup_download_folder()
    
    # Setup browser
    driver = setup_driver()
    if not driver:
        return
    
    try:
        # Login
        login_to_meetup(driver)
        
        # Get cookies for downloads
        cookies = driver.get_cookies()
        
        # Find albums
        album_urls = get_photo_albums(driver, GROUP_URL)
        
        # Download photos
        total_downloaded = 0
        albums_processed = 0
        
        for album_url in album_urls:
            album_name = urlparse(album_url).path.strip('/').split('/')[-1]
            if not album_name:
                album_name = "main_photos"
            
            downloaded = download_photos_from_page(driver, album_url, album_name, cookies)
            total_downloaded += downloaded
            albums_processed += 1
        
        # Save metadata
        save_metadata(albums_processed, total_downloaded)
        
        # Summary
        print("\n" + "=" * 60)
        print("DOWNLOAD COMPLETE!")
        print("=" * 60)
        print(f"Albums processed: {albums_processed}")
        print(f"Photos downloaded: {total_downloaded}")
        print(f"Location: {os.path.abspath(DOWNLOAD_FOLDER)}")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        print("\n⏳ Closing browser in 5 seconds...")
        time.sleep(5)
        driver.quit()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠ Download interrupted by user")
