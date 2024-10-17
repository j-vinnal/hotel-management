# Hotel Room Booking Application

This project is a hotel room booking application built using Next.js and hosted on Azure. You can explore the application at [https://hotel-x.azurewebsites.net/](https://hotel-x.azurewebsites.net/).


## Project Structure

The project is organized into several key directories and files:

- **`src/services/base/`**: Contains the base service classes used for making HTTP requests.

  - **`BaseService.ts`**: An abstract class that sets up Axios for making HTTP requests. It includes error handling and request interceptors.
  - **`BaseEntityService.ts`**: Extends `BaseService` to provide CRUD operations for entities. It handles JWT authentication and token refresh logic.

- **`src/interfaces/`**: Contains TypeScript interfaces for type safety.

  - **`auth/IResultObject.ts`**: Defines the structure of the result object returned by service methods.
  - **`IJWTResponse.ts`**: Defines the structure of the JWT response used for authentication.

- **`src/pages/`**: Contains the Next.js pages, which are automatically routed based on their file names.

  - **`[id].tsx`**: Dynamic routing is used to handle pages for individual hotel rooms, identified by their unique IDs.

- **`src/components/`**: Contains reusable React components used throughout the application.

- **`public/`**: Contains static assets such as images and icons.

## Design and Styling

- **Bootstrap**: The application uses Bootstrap for styling and responsive design. This ensures a consistent and modern look across different devices and screen sizes.

- **Design Inspiration**: 
  - The homepage design is inspired by [cityboxhotels.com](https://www.cityboxhotels.com).
  - The admin and user management CRUD functionality design follows a traditional ASP.NET MVC view design.

## Important Note

While in-memory databases can be useful for certain backend operations, it is generally not recommended to use them for frontend applications. In-memory databases do not persist data across sessions, which can lead to data loss when the application is closed or refreshed.

## Seeded Users

The application comes with pre-configured users for testing purposes:

- **Admin User**

  - **UserName**: `admin@hotelx.com`
  - **Password**: `Foo.Bar1`

- **Guest User**
  - **UserName**: `guest@hotelx.com`
  - **Password**: `Guest.Pass1`

When registering a new user through the application, the user will be created with regular user privileges.

## Key Features

- **Next.js Framework**: Utilizes Next.js for its server-side rendering capabilities, which improve SEO and performance. The framework's built-in image optimization and dynamic routing features are particularly beneficial for a hotel booking application.

- **Dynamic Routing**: The use of `[id].tsx` in the `pages` directory allows for dynamic routing, making it easy to create pages for individual hotel rooms based on their IDs.

- **Image Optimization**: Next.js automatically optimizes images, ensuring fast load times and a better user experience.

- **JWT Authentication**: The application uses JWT for secure authentication. The `BaseEntityService` class handles token refresh logic to maintain user sessions.

## X-Road Protocol Support

Our service supports the X-Road protocol, implemented via the `X-Road-Client` header. This header is added to all HTTP requests made through the `BaseService` class.


## Getting Started

To get started with the project, follow these steps:

1. **Install Dependencies**: Run `npm install` to install all necessary packages.
2. **Run the Development Server**: Use `npm run dev` to start the development server. The application will be available at `http://localhost:3000`.
3. **Build for Production**: Use `npm run build` to create an optimized production build.


## Docker (Optional)

###  Dockerfile Build Information

The application is containerized using a multi-stage Dockerfile. It leverages Node.js 18 on Alpine Linux for a lightweight and efficient build. The Dockerfile includes stages for installing dependencies, building the application, and preparing a production-ready image with Next.js optimizations.

### Build and run locally

Create the image:

```bash
docker build -t hotelx-nextjs:latest .
```

Run the container

```bash
docker run -d -p 8080:80 hotelx-nextjs:latest
```

### Build to Docker Hub

Create the image:

```bash
docker buildx build --progress=plain -t hotelx-nextjs:latest .
```

Create a tag:

```bash
docker tag hotelx-nextjs <your-docker-hub-profile>/hotelx-nextjs:latest
```

Push the image:

```bash
docker push <your-docker-hub-profile>/hotelx-nextjs:latest
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.
