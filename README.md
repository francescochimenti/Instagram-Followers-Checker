# Instagram Follower Management Tool

**A simple tool to identify users you follow on Instagram who do not follow you back.**

## Features

- **Identify Unfollowers:** Quickly find out who isn't following you back.
- **User-Friendly Interface:** Simple and intuitive design for smooth navigation.

## How to Use

1. **Download Your Instagram Data:**

   - Go to your Instagram account settings and request to download your data.
   - Specifically, download the data for your followers and the accounts you follow in **JSON format**.

2. **Prepare the Data:**

   - After downloading the data, navigate to the JSON files for your **followers** and the accounts you **follow**.
   - You should have two files: `followers_1.json` and `following.json`.

3. **Set Up the Project:**

   - Inside the `src` folder of the project, create a folder named `data`.
   - Move the `followers_1.json` and `following.json` files into this `data` folder.

4. **Install Dependencies:**

   - Open your terminal in the project directory and run the following command to install the necessary dependencies:

     ```bash
     npm install
     ```

5. **Run the Application:**

   - After installing the dependencies, start the web app by running:

     ```bash
     npm start
     ```

6. **Interact with the Application:**
   - Once the app is running, simply click on any of the names listed, and their Instagram profile will open directly in your browser.
