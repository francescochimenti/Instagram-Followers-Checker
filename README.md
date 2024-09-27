# Instagram Follower Management Tool

A simple tool to identify users you follow on Instagram who do not follow you back.

## Features

- **Identify Unfollowers:** Quickly find out who isn't following you back.
- **User-Friendly Interface:** Simple and intuitive design for smooth navigation.

## How to Use

1. **Download Your Instagram Data:**

   - Go to your Instagram app or website and navigate to **Account Center**.
   - Select **Your Information and Permissions**.
   - Click on **Download Your Information**.
   - Choose **Download or Transfer Information**.
   - Under **Some of Your Information**, select **Contacts**.
   - Choose **Followers** and **Followed Accounts/Pages**.
   - Click on **Download to Device**.
   - Set the **Date Range** to **All Time**.
   - Select the **Format** as **JSON**.
   - Finally, click on **Create File**. You will receive a notification when your data is ready for download.

2. **Upload Your Data:**

   - After downloading, unzip the data file.
   - Locate the following JSON files in the unzipped folder:
     - **followers_1.json:** Contains your list of followers.
     - **following.json:** Contains the accounts you follow.

3. **File Requirements:**

   - Ensure that the JSON files are structured correctly to ensure accurate processing.

4. **Using the App:**

   - Open the app and use the provided input fields to upload both the **followers** and **following** JSON files.
   - Click the **Confirm and Process** button to process the data.

5. **Interacting with the Results:**

   - The app will display users you follow who do not follow you back.
   - Click on any displayed name to open their Instagram profile directly in your browser.

## Link to the App

You can access the tool at: [Click here](https://igfollowerschecker.netlify.app).
