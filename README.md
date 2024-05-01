<p align="center">
  <a href="" rel="noopener">
 <img width=75px height=75px src="https://user-images.githubusercontent.com/40510223/180670733-9357d0b7-771e-4802-92f7-1d824c215543.png" alt="Project logo"></a>
</p>

<h1 align="center">Peri</h1>

<div align="center">

  [![Last Commit](https://img.shields.io/github/last-commit/asecco/peri?style=for-the-badge)](https://github.com/asecco/peri)
  [![GitHub stars](https://img.shields.io/github/stars/asecco/peri?style=for-the-badge)](https://github.com/asecco/peri/stargazers)
  [![GitHub Issues](https://img.shields.io/github/issues/asecco/peri.svg?style=for-the-badge)](https://github.com/asecco/peri/issues)

</div>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#frequently-asked-questions">FAQ</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#setup">Setup</a> •
  <a href="#built-with">Built With</a> •
  <a href="#license">License</a>
</p>

---

<p align="center"> Browse your favorite movies/tv and find the perfect watch for any occasion, personalized with recommendations based on what you’ve enjoyed.
  <br> 
</p>

![demo](https://github.com/asecco/peri/assets/40510223/19bdb52a-ef38-4126-84a8-1004dd77e74a)

<p align="center">Like what you see? Please consider giving <strong>Peri</strong> a GitHub star ⭐, it will help a lot!</p>

## About
Peri was originally designed to be similar to a modern streaming media service UI, being inspired by platforms such as [Plex](https://www.plex.tv) and [Hulu](https://www.hulu.com). Peri includes no streaming functionality and serves as an extensive database of films and tv series, allowing you to browse and garner information on whichever type of media you desire.

## Features
- Personalized recommendations
- Modern UI and fully mobile responsive
- Direct links to legal streaming options(Netflix, Prime Video, Apple TV, etc.)
- Embedded trailers
- Comment section for reviewing/discussing with the community
- Search functionality with autocomplete suggestions
- Unique collections allowing you to create your own lists and share them with others
- Lazy loading
- Local storage for saving favorites
- Server-side rendering via Next.js

## Frequently Asked Questions
### What is the purpose of Peri, and why should I use it?
- I've always wanted Peri to be a great resource for avid movie/tv fans like myself to browse different content and find what they desire. In today's world, there are dozens of different streaming services with varying amounts of content. This can make it troublesome to know where to look, and that's where Peri comes in!
- Peri's recommendations are personalized based on what you've enjoyed in the past, and the site is designed to be as simple and easy to use as possible. The site is also consistently updated and I'm always looking for ways to improve the overall feel and functionality.

### Can I use Peri without creating an account?
- Yes! I want to keep this site as simple and convenient for all users, so you are never required to register an account or give any personal information.
- For the community discussion/review section, there is an optional field for your email, but you're not required to give one to post. While this is great for preserving anonymity for users, in order to prevent spam and inappropriate posts, a moderator will have to approve the post before it gets displayed to everyone on the site.

### I use Trakt, is there a way for me to import my existing data to Peri?
- Yes, there is support for importing your Trakt movies/shows that you've rated into Peri favorites. You can export your data by being a Trakt VIP member or by using amazing tools like [this](https://darekkay.com/blog/trakt-tv-backup/).
- Peri currently supports importing TXT/JSON files in the following format:
```json
[
  {
    "rated_at": "2023-07-16T15:47:24.000Z",
    "rating": 8,
    "type": "movie",
    "movie": {
      "title": "Pulp Fiction",
      "year": 1994,
      "ids": {
        "trakt": 554,
        "slug": "pulp-fiction-1994",
        "imdb": "tt0110912",
        "tmdb": 680
      }
    }
  },
]
```
- Any movie/show that you've rated an 8 or greater will be imported.

### My favorites disappeared, what happened to them?
- Instead of opting for a more traditional account creation process, I use your browser's local storage to store the favorites. This is better for simplicity's sake and overall convenience for users.
- If you recently lost your favorites, you likely switched your browser/device or cleared your browser's cache. Unfortunately, there is not currently a way of retrieving the lost data.

### Can I ask for new features or suggest any improvements for Peri?
- Definitely! I would love to hear any feedback from the community on ways to improve the site.
- To get started, head over to the [discussion](https://github.com/asecco/peri/discussions/categories/features-improvements) section and start a new thread.

### Can I contribute to this project?
- Yes! Head down to the [contributing](#contributing) section to learn more about how you can help!

## Contributing
I would love to expand upon this project over time with continuous updates to ensure it remains up-to-date and a great resource for movie fans.

Pull requests are welcome for simple bug fixes and general improvements! Head over to the [issues](https://github.com/asecco/peri/issues) section to see if there is anything currently open, and head down to the [setup](#setup) section to get your development environment configured.

If you want to contribute new features or drastically change a current feature. Please open a [discussion](https://github.com/asecco/peri/discussions/categories/general) before working on it, to ensure this is a change that I feel is properly suited for this project.

![upates2](https://user-images.githubusercontent.com/40510223/184010219-96e98fde-8f7e-4383-8fac-f25b2f914d0f.gif)
![updates](https://user-images.githubusercontent.com/40510223/184007866-240f831c-6d52-43b5-8414-b5c1f93f0aa0.gif)

## Setup
1. Clone the repo
```sh
git clone https://github.com/asecco/peri.git
```
```sh
cd peri
```

2. Install the dependencies
```sh
yarn install
```

3. Open the `.env` file in the root directory and replace the `PLACE_KEY_HERE` placeholders with your API keys after registering on [TMDB](https://www.themoviedb.org/documentation/api), [Watchmode](https://api.watchmode.com), and [YouTube](https://developers.google.com/youtube/v3/getting-started). All API keys are free to obtain with limits. The TMDB key is the only one that is absolutely ***required*** for the majority of the project's features to function locally without errors.
```js
NEXT_PUBLIC_API_KEY = PLACE_KEY_HERE
WATCHMODE_API_KEY = PLACE_KEY_HERE
YOUTUBE_API_KEY = PLACE_KEY_HERE
```

4. Start the development server
```sh
yarn run dev
```

## Built With
- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
- [![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
- [![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
- [![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
