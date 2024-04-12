AUTHOR = 'sfiera'
SITENAME = 'GBKiss'
SITEURL = ''

PATH = 'content'

THEME = 'basic'

TIMEZONE = 'Asia/Tokyo'

FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

PAGE_PATHS        = [""]
PAGE_URL          = "{slug}"
PAGE_SAVE_AS      = PAGE_URL + ".html"

STATIC_PATHS      = [""]
STATIC_URL        = "{path}"
STATIC_SAVE_AS    = "{path}"

ARTICLE_PATHS     = []

# Blogroll
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = False
DISPLAY_PAGES_ON_MENU = False
MENUITEMS = [
    ("GBKiss",      "/"),
    ("Files",       "/file"),
    ("Cartridges",  "/cart"),
    ("GBKiss Link", "/link"),
]


# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
