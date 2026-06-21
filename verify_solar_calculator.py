import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(record_video_dir="videos/")
        page = await context.new_page()

        print("Navigating to Solar Calculator...")
        await page.goto("http://127.0.0.1:5173/solar-calculator", wait_until="networkidle")

        # Wait for the select element specifically to appear
        try:
            await page.wait_for_selector('select', timeout=5000)
            print("Select element found.")

            # Select a facility type
            print("Selecting 'مصنع' (factory)...")
            await page.select_option("select", value="factory")
            await page.wait_for_timeout(1000)

            # Check that appliance inputs updated
            await page.screenshot(path="solar_calculator_factory.png", full_page=True)
            print("Factory screenshot taken.")

            # Modify Days of Autonomy
            print("Modifying Days of Autonomy...")
            await page.fill('input[type="range"]', "2")
            await page.wait_for_timeout(1000)

            # Take final screenshot
            await page.screenshot(path="solar_calculator_final.png", full_page=True)
            print("Final screenshot taken.")
        except Exception as e:
            print(f"Error interacting with page: {e}")
            await page.screenshot(path="solar_calculator_error.png", full_page=True)
            print("Error screenshot taken.")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
