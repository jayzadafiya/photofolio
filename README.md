# PhotoFolio Website

This is a photo portfolio website built with React.js and Firebase, designed to showcase your photo albums and images. It allows you to add albums, add images to these albums, edit image details, delete images, and drag and drop images into different albums.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Demo

[Live Demo](https://64f5973c2cc4e02283e68807--golden-squirrel-4aef39.netlify.app/) - Add a link to your live website here.

## Features

- Create and manage photo albums.
- Drag and drop images to reorder or move them between albums.
- Upload and organize images within albums.
- Edit image details, including title and description.
- Delete images from albums.

## Technologies Used

- React.js
- Firebase (Firestore and Firebase Storage)

## Getting Started

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/jayzadafiya/photofolio.git
   ```

2. Install project dependencies:

   ```bash
   cd photofolio
   npm install
   ```

3. Configure Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project and copy the configuration settings.
   - Create a Firestore database and set up Firebase Storage.
   - Replace the Firebase configuration in the project with your own in the `src/firebase.js` file.

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and go to `http://localhost:3000` to view the app.

## Usage

- Use the "Add Album" button to create a new album.
- Click on an album to view its images.
- Inside an album, you can upload images, edit their details, delete them, and use drag-and-drop to rearrange them.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

---
