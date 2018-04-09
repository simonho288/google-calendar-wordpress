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

3. Add this theme to WordPress
For most easiler way to add this theme to your local WordPress, you can create a symbolic link to this project root directory. Below is the Linux command to do that (assume the Wordpress is installed in /var/www/html):

```bash
$ ln -s $(pwd) /var/www/html/wp-content/themes/google-calendar-wordpress
```

4. Activate and see the result

You can activate this theme via your WordPress admin. Then click `visit site` to see what's the theme does.

