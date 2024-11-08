# MusicArtTherapyApp
Music / Art Therapy Web Application



To test the application:

# Starting the project:

1. Using `Vite` as the build tool.
2. To make the NPM create a `package.json` that will contain the minimal information needed to run a `Node.js` project, run:
    
    ```bash
    npm init -y
    ```
    
3. run:
    
    ```bash
    npm install vite
    ```
    
4. You should notice three things:
    1. **`node_modules/`**  → this folder contains the project dependencies and should never be modified
    2. **`package.json`** → contains an array of dependencies written in `dependencies`
    3. **`package-lock.json`**→ contains information about the dependencies and exact versions that have been installed in your project without tolerance
5. If you want to share your website with another developer, you’ll want to remove the `node_modules` folder and share the rest of the project.
6. Make the following file `index.html`. Do not open the file directly!
7. In `package.json`, replace the `scripts` part with the following:
    
    ```json
    {
      // ...
      "scripts": {
        "dev": "vite",
        "build": "vite build"
      },
      // ...
    }
    ```
    
8. To run the “dev” script, in the terminal, run:
    
    ```bash
    npm run dev
    ```
    
9. Vite should display a URL looking like **`http://localhost:5173/`** Copy and paste it into your browser to open it like any website.
