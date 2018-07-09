This is the source codes of the [Blog](https://blog.simonho.net/google-calendar-wordpress-theme-steps-by-steps/) to describe how to build a Wordpress theme which the frontend displays a calendar (using jQuery FullCalendar). The Wordpress as backend which the PHP codes communicate with Google Calendar (via Google API service account) to perform loading/saving event(s). Unlike other common tutorials, this repo chooses Server-to-Server communication approach. This does NOT require users to authenticate and consent.

### Prerequisite
1. WordPress 4.9+
2. PHP 7.0+
3. [Composer 1.6+](https://getcomposer.org/)
4. A Google Account

### Run the project

1. Download the project into your local machine.

2. Run the composer to download the requried packages
```bash
$ cd [project root directory]
$ composer install
```

3. Download the API Key from Google API console
As the Blog described, download the API Key file from Google API console. Rename it as `service-account.json` and put it at the project root directory.

4. Add this theme to WordPress
For most easiler way to add this theme to your local WordPress, you can create a symbolic link to this project root directory. Below is the Linux command to do that (assume the Wordpress is installed in /var/www/html):

```bash
$ ln -s $(pwd) /var/www/html/wp-content/themes/google-calendar-wordpress
```

5. Activate and see the result

You can activate this theme via your WordPress admin. Then click `visit site` to see what's the theme does.

## License

The MIT License (MIT)

Copyright (c) 2018 Simon Ho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

