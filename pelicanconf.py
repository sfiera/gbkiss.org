import datetime

AUTHOR = "sfiera"
SITENAME = "GBKiss.org"
SITEURL = ""

PATH = "content"

THEME = "theme"

TIMEZONE = "Asia/Tokyo"

PAGE_PATHS        = [""]
PAGE_URL          = "{slug}"
PAGE_SAVE_AS      = PAGE_URL + ".html"

STATIC_PATHS      = [""]
STATIC_URL        = "{path}"
STATIC_SAVE_AS    = "{path}"

DIRECT_TEMPLATES = []
ARTICLE_PATHS     = []

DEFAULT_PAGINATION = False
DISPLAY_PAGES_ON_MENU = False
MENUITEMS = [
    ("Files",       "/file"),
    ("Cartridges",  "/cart"),
    ("Technology",  "/tech"),
    ("GBKiss Link", "/link"),
]


IGNORE_FILES = [".*", "*.rsti"]
LINKS = []
SOCIAL = []
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

NOW = datetime.datetime.now()
