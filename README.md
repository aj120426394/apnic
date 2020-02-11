# APNIC Developer Exercise

## Pre-requested tool
- docker
- nvm


## How to start ?
1. Run `docker-compose up -d`
2. Run `cd ./db`
3. Run `sh mysql-restore.sh`
4. Open browser and browse to `localhost:8000`

## How to develop ?
1. Run `nvm use`
2. Run `cd react-on-wordpress`
3. Run `npm install`
4. Run `npm start` for development

## How to deploy ?
1. Run `npm bulid`
2. Run `cp ./build/asset-manifest.json ../wordpress/wp-content/plugins/react-n-wordpress/asset-manifest/asset-manifest.json`
3. Browse `localhost:8000`

**If you want to host the react app at somewhere else. You need to edit the `publicPath` in `react-on-wordpress/config/webpack.config.js`. Replace `http://localhost:8080/` to your host path**



## Some thought
I like to address how the decision been made, what are the challenges and the solution

### WordPress
To bring the customized `.js` and `.css` code to a CMS such as WordPress, I need to host those files in a server then link them in the page of CMS. Ideally, I should host them in the same domain as the host of WordPress. But I tried not to mess up the WordPress repository, and I also don't like the
  idea of putting extra `.js` and `.css` code into `wp-plugin` I decide to setup another apache server to host those files. In this case, I mount the `bulid` folder in the `react-n-wordpress` into the apache server, so any output from react build can be link with `localhost:8080`.
Although the plugin market already have the Embed React plugin on Wordpress, it doesn't support injecting more than 2 `.js` file for one App. As I use `create-react-app` to start the React app, the runtime chunk file is defaultly on. I choose to create my own WordPress plugin to allow me load more than 2 files for an App.
My initial thought was the user provide the url of the `asset-manifest.json` in the shortcode and the plugin will load all the required files from it. So the user can host their React app repo in their decide server, then inject the App into the WordPress in a simple way.
However, there were some technical constrains that didn't allow me to refer the `asset-manifest.json` from different domain (`localhost:8000` vs `localhost:8080`). So make the idea happened, the user need to copy the `asset-manifest.json` from the react output folder to the specific folder in the
 plugin then giving the name of the file in the shortcode like this `[react_n_wordpress asset-manifest="test.json"]`. I believe this can be solved if I can spend more time on it.

### React
With my previous experience, one of the issue to embed an external app on a CMS page is that style normally be overwritten. For example, we provide a stylesheet `p { color: white; }`, it will be overwritten by `.wp-theme-style p { color: red; }`. To solve this issue, we need to make the
 indicator in the stylesheet more specific. My colleague and I created an `postCSS` plugin that can help to prefix all the indicator in the stylesheet when I was working at Griffith University. For previous instance, if we ust the `postCss`: `require('postcss-prefixwrap')('.react-1 .react-2 .react-3')`. Our output stylesheet become
 `.react-1 .react-2 .react-3 p { color: white; }`. Then we add 3 more layer with the class name `.react-1`, `.react-2`, `.react-3` in the root container. Our customized style will have higher priority.

