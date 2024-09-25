const u8 = x => new Uint8Array(x);
const cc = x => x.charCodeAt(0);
const obj = Object.fromEntries;

const RGN_HEADER_SIZE = 6;
const RGN = obj(["FREE", "REGULAR", "ZERO", "SPECIAL"].map(x => [x, cc(x)]));

const KISS_MAIL_STUB = u8("\17\0\6\0\12\1KISS MAIL".split("").map(cc)).buffer;

const FILES = {
  baketu: "/file/bakechu-relay/baketu.gbf",
  biorythm: "/file/biorhythm/biorythm.gbf",
  bj: "/file/blackjack/bj.gbf",
  bland: "/file/binary/bland.gbf",
  cannon: "/file/cannon-ball/cannon.gbf",
  chardump: "/file/char-dump/chardump.gbf",
  del_all: "/file/delete-all/del_all.gbf",
  dentaku: "/file/calculator/dentaku.gbf",
  drive: "/file/drive/drive.gbf",
  family_s: "/file/family-shot/family_s.gbf",
  iconedit: "/file/icon-edit/iconedit.gbf",
  iconsend: "/file/icon-send/iconsend.gbf",
  kissmon2: "/file/kiss-mon-2/kissmon2.gbf",
  kissmon: "/file/kiss-mon/kissmon.gbf",
  koura1: "/file/puzzle-game/koura1.gbf",
  koura2: "/file/puzzle-game/koura2.gbf",
  koura3: "/file/puzzle-game/koura3.gbf",
  mag_data: "/file/magnets/mag_data.gbf",
  magnets: "/file/magnets/magnets.gbf",
  mogura: "/file/mogutte-nanbo/mogura.gbf",
  passwords: "/file/mail/passwords.gbf",
  poker: "/file/poker/poker.gbf",
  puzzle: "/file/puzzle-game/puzzle.gbf",
  roulette: "/file/roulette/roulette.gbf",
  saita: "/file/saita/saita.gbf",
  samegame: "/file/samegame/samegame.gbf",
  sezaki: "/file/mogutte-nanbo/sezaki.gbf",
  shot: "/file/shot/shot.gbf",
  slot: "/file/slot/slot.gbf",
  soundtst: "/file/sound-test/soundtst.gbf",
  sramtool: "/file/sram-get-and-clear/sramtool.gbf",
  sw_data: "/file/watch-and-timer/sw_data.gbf",
  sw_timer: "/file/watch-and-timer/sw_timer.gbf",
  worm: "/file/worm/worm.gbf",
};

const PLAIN_CHARS =
    ("\u0000abcdefghijklmno" +
     "pqrstuvwxyz｢|｣¯\\" +
     " !\"#$%&'()*+,-./" +
     "0123456789:;<=>?" +
     "@ABCDEFGHIJKLMNO" +
     "PQRSTUVWXYZ[¥]^_" +
     "をあいうえおかきくけこさしすせそ" +
     "たちつてとなにぬねのはひふへほま" +
     "みむめもやゆよらりるれろわんがぎ" +
     "ぐげござじずぜぞだぢづでどばびぶ" +
     "べぼぱぴぷぺぽぁぃぅぇぉゃゅょっ" +
     "ヲアイウエオカキクケコサシスセソ" +
     "タチツテトナニヌネノハヒフヘホマ" +
     "ミムメモヤユヨラリルレロワンガギ" +
     "グゲゴザジズゼゾダヂヅデドバビブ" +
     "ベボパピプペポァィゥェォャュョッ");

const KATAKANA =
    ("「」、。ヲァィゥェォャュョッ" +
     "ーアイウエオカキクケコサシスセソ" +
     "タチツテトナニヌネノハヒフヘホマ" +
     "ミムメモヤユヨラリルレロワン");

const HIRAGANA =
    ("「」、。をぁぃぅぇぉゃゅょっ" +
     "ーあいうえおかきくけこさしすせそ" +
     "たちつてとなにぬねのはひふへほま" +
     "みむめもやゆよらりるれろわん");

const DIA_PARTS = [
  "ハヒフヘホはひふへほカキクケコかきくけこサシスセソさしすせそタチツテトたちつてと",
  "バビブベボばびぶべぼガギグゲゴがぎぐげごザジズゼゾざじずぜぞダヂヅデドだぢづでど",
  "パピプペポぱぴぷぺぽ",
];
const diacritics = [
  obj(DIA_PARTS[1].split("").map((x, i) => [DIA_PARTS[0][i], x])),
  obj(DIA_PARTS[2].split("").map((x, i) => [DIA_PARTS[0][i], x])),
];


const BUILTIN_ICONS = {};
BUILTIN_ICONS[0x01] = "/file/icon/letter.png";
BUILTIN_ICONS[0x81] = "/file/icon/mail.png";
BUILTIN_ICONS[0x40] = "/file/icon/hikou0.png";
BUILTIN_ICONS[0x41] = "/file/icon/puzzle0.png";
BUILTIN_ICONS[0x42] = "/file/icon/ken0.png";
BUILTIN_ICONS[0x43] = "/file/icon/card0.png";
BUILTIN_ICONS[0x44] = "/file/icon/map.png";
BUILTIN_ICONS[0x45] = "/file/icon/ie2.png";
const EMPTY_ICON = "/file/menu/empty.png";
const BROKEN_ICON = "/file/icon/simula1.png";

const TEXT_IMAGE = new Image();
TEXT_IMAGE.src = "/tech/text/font.png"

const FILL_COLORS = ["#fff", "#aaa", "#555", "#000"];

const makeElement = (tagName, properties = {}) => {
  const el = document.createElement(tagName);
  Object.entries(properties).forEach(([key, value]) => {
    if (key === "children") {
      el.replaceChildren(...value);
    } else if (key === "eventListeners") {
      Object.entries(value).forEach(([type, listener]) => {
        el.addEventListener(type, listener);
      });
    } else if (key === "drop") {
      el.addEventListener("dragenter", e => {el.classList.add("dropTarget")});
      el.addEventListener("dragleave", e => {el.classList.remove("dropTarget")});
      el.addEventListener("dragover", e => {e.preventDefault()});
      el.addEventListener("drop", (e, ...args) => {
        e.preventDefault();
        el.classList.remove("dropTarget");
        value(e, ...args);
      });
    } else {
      el[key] = value;
    }
  });
  return el;
};

makeImage = (width, height, fn) => {
  const canvas = makeElement("canvas", {
    width: width,
    height: height,
  });
  fn(canvas.getContext("2d"));
  return canvas.toDataURL();
};

decodeImage = (buffer, width, height, bpp) => makeImage(width, height, ctx => {
  data = new DataView(buffer);
  let i = 0;
  for (let col = 0; col < width; col += 8) {
    for (let row = 0; row < height; row++) {
      let byte1 = data.getUint8(i);
      i += bpp;
      let byte2 = data.getUint8(i - 1);
      let mask = 0x80;
      for (let bit = 0; bit < 8; ++bit) {
        let color = ((byte1 & mask) ? 1 : 0) + ((byte2 & mask) ? 2 : 0);
        mask >>= 1;
        ctx.fillStyle = FILL_COLORS[color];
        ctx.fillRect(col + bit, row, 1, 1);
      }
    }
  }
});

textIcon = string => makeImage(32, 24, ctx => {
  string.split("").forEach((ch, i) => {
    ch = PLAIN_CHARS.indexOf(ch);
    const sx = (ch % 16) * 8;
    const sy = Math.floor(ch / 16) * 8;
    const dx = (i % 4) * 8;
    const dy = Math.floor(i / 4) * 8;
    ctx.drawImage(TEXT_IMAGE, sx, sy, 8, 8, dx, dy, 8, 8);
  });
});

const decodePlainText = buffer => u8(buffer).reduce((s, ch) => s + PLAIN_CHARS[ch], "");

const decodeRichText = buffer => u8(buffer).reduce(([string, kana], ch) => {
  if (ch === 0x0E) {
    return [string, KATAKANA];
  } else if (ch === 0x0F) {
    return [string, HIRAGANA];
  } else if (ch <= 0x1F) {
  } else if (ch <= 0x5F) {
    return [string + PLAIN_CHARS[ch], kana];
  } else if (ch <= 0x7F) {
    return [string + PLAIN_CHARS[ch - 0x60], kana];
  } else if (ch < 0xA1) {
  } else if (ch <= 0xDD) {
    return [string + kana[ch - 0xA2], kana];
  } else if (ch <= 0xDF) {
    const head = string.slice(0, -1), tail = string.slice(-1);
    return [head + (diacritics[ch - 0xDE][tail] || tail), kana];
  }
  return [string + String.fromCharCode(ch), kana];
}, ["", KATAKANA])[0];

const hexByte = byte => "$" + ("0" + byte.toString(16)).slice(-2);

const toDataUrl = buffer => new Promise(resolve => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.readAsDataURL(new Blob([buffer]));
});

const downloadUrl = (filename, url) => {
  makeElement("a", {download: filename, href: url}).click();
};

const selectFile = accept => new Promise(resolve => {
  makeElement("input", {
    type: "file",
    accept: accept,
    eventListeners: {
      change: e => {resolve(e.target.files[0])},
      cancel: e => {resolve(null)},
    },
  }).click();
});

const typeIcon = file => {
  let shape = "triangle";
  if (file.isExecutable) {
    if (file.ownerId === 1) {
      shape = "bullseye";
    } else if (file.isZeroFile) {
      shape = "diamond";
    } else {
      shape = "circle";
    }
  }
  return makeElement("img", {
    src: `/file/menu/${shape}.svg`,
    style: "width: 0.75em; height: 0.75em",
  });
};

const runModal = (children, buttons) => new Promise(resolve => {
  const dlog = makeElement("dialog", {
    children: children,
  });

  const form = makeElement("form", {
    method: "dialog",
    children: buttons.map(b => makeElement("button", {innerText: b, value: b})),
  });
  form.firstChild.autofocus = true;
  dlog.appendChild(form);

  dlog.addEventListener("close", e => {
    document.body.removeChild(dlog);
    resolve(dlog.returnValue);
  });
  document.body.appendChild(dlog);
  dlog.showModal();
});

class Addr {
  constructor({bank, gb, sram}) {
    if (typeof gb !== "undefined") {
      if (typeof sram !== "undefined") {
        throw new Error("passed both gb and sram");
      } else if ((bank < 0) || (4 <= bank)) {
        throw new Error(`invalid addr bank: ${bank}`);
      } else if ((gb < 0xA000) || (0xC000 < gb)) {
        throw new Error(`invalid mapped addr: ${gb}`);
      }
      [this.bank, this.gb] = [bank, gb];
    } else if (typeof sram !== "undefined") {
      if ((sram < 0) || (0x8000 <= sram)) {
        throw new Error(`invalid sram addr: ${sram}`);
      }
      [this.bank, this.gb] = [sram >> 13, (sram & 0x1FFF) + 0xA000];
    } else {
      throw new Error("invalid arguments")
    }
  }

  get sram() { return (this.bank << 13) + (this.gb - 0xA000) }
  get adjusted() { return this.gb === 0xC000 ? this.add(2) : this }

  add(offset) { return new Addr({sram: this.sram + offset}) }
  sub(offset) { return new Addr({sram: this.sram - offset}) }
};

class RegionHeader {
  constructor(type, addr, prev, next) {
    [this.type, this.addr, this.prev, this.next] = [type, addr, prev, next];
  }

  static read(dataView, addr) {
    const type = dataView.getUint8(addr.sram);
    const typeCpl = dataView.getUint8(addr.sram + 1)
    if ((type ^ typeCpl) !== 0xFF) {
      throw new Error(`invalid region header at ${addr.sram}: ${type} ^ ${typeCpl}`);
    }
    const prevGb = dataView.getUint16(addr.sram + 2, true);
    const prev = (addr.gb !== 0xA002) ? new Addr({bank: addr.bank, gb: prevGb}) :
        (addr.bank > 0)               ? new Addr({bank: addr.bank - 1, gb: prevGb}) :
                                        null;
    const nextGb = dataView.getUint16(addr.sram + 4, true);
    const next = new Addr({bank: addr.bank, gb: nextGb});
    return new RegionHeader(type, addr, prev, next);
  }

  get size() { return this.next.sram - this.addr.sram - RGN_HEADER_SIZE }
  get body() { return this.addr.add(RGN_HEADER_SIZE) }
};

class KissFile {
  constructor(arrayBuffer) {
    this.data = new DataView(arrayBuffer);
    const size = this.data.getUint16(0, true);
    if (size !== arrayBuffer.byteLength) {
      throw new Error(`invalid gbf length: ${size} != ${arrayBuffer.byteLength}`);
    }
  }

  get size() { return this.data.byteLength; }
  get cartId() { return this.data.getUint8(3); }
  get ownerId() { return this.data.getUint8(5); }

  get flags() { return this.data.getUint8(2); }
  get hasIcon() { return this.flags & 0x10; }
  get hasIcon2bpp() { return this.flags & 0x08; }
  get iconBpp() { return this.hasIcon ? (this.hasIcon2bpp ? 2 : 1) : 0; }
  get isExecutable() { return this.flags & 0x04; }
  get isZeroFile() { return this.flags & 0x02; }
  get hasHistory() { return this.flags & 0x01; }

  get author() {
    const history = 5 + this.data.getUint8(4);
    return decodePlainText(this.data.buffer.slice(history + 2, history + 12)).trimEnd();
  }

  get title() {
    const headerSize = this.data.getUint8(4);
    let titleEnd = 5 + headerSize - (0x60 * this.iconBpp);
    return decodeRichText(this.data.buffer.slice(6, titleEnd));
  }

  get iconUrl() {
    if (this.hasIcon) {
      const iconEnd = 5 + this.data.getUint8(4);
      const iconStart = iconEnd - (0x60 * this.iconBpp);
      return decodeImage(this.data.buffer.slice(iconStart, iconEnd), 32, 24, this.iconBpp);
    } else if (this.ownerId === 0) {
      return textIcon(this.title);
    } else if (BUILTIN_ICONS[this.ownerId]) {
      return BUILTIN_ICONS[this.ownerId];
    } else {
      return null;
    }
  }

  toDataUrl() { return toDataUrl(this.data.buffer); }
};

class SaveFile {
  constructor(arrayBuffer) {
    if (arrayBuffer.length < 0x8000) {
      throw new Error(`save file too short: ${arrayBuffer.length}`);
    }
    const copy = new ArrayBuffer(arrayBuffer.byteLength);
    u8(copy).set(u8(arrayBuffer));
    this.data = new DataView(copy);

    let cursor = new Addr({sram: 0x0002});
    let prev = null;
    let index = null;
    let profile = null;
    while (true) {
      let rgn = RegionHeader.read(this.data, cursor);
      if ((rgn.prev !== null) && (rgn.prev.sram !== prev)) {
        throw new Error(`invalid prev pointer: ${prev}`);
      }
      if (rgn.type === RGN.SPECIAL) {  // 'S'
        if (index === null) {
          index = cursor.add(6);
        } else if (profile === null) {
          profile = cursor.add(6);
          if (rgn.next.gb !== 0xC000) {
            throw new Error("profile region is not last");
          }
          break;
        }
      } else if (index !== null) {
        throw new Error("index region should be immediately followed by profile");
      }
      prev = cursor.sram;
      cursor = rgn.next.adjusted
    }
    if (profile.sram !== index.add(486).sram) {
      throw new Error(`index is wrong size: ${profile.sram - index.sram}`);
    } else if (profile.gb > 0xBF86) {
      throw new Error(`profile is truncated: ${profile.sram}`);
    }

    this.indexPos = index;
    this.profilePos = profile;
  }

  get files() {
    const list = [];
    for (let i = 0; i < 120; ++i) {
      list.push(this.fileAt(i));
    }
    return list;
  }

  getRegions() {
    let cursor = new Addr({sram: 0x0002});
    const rgns = [];
    while (true) {
      let rgn = RegionHeader.read(this.data, cursor);
      if ((rgn.type == RGN.SPECIAL) && (rgn.next.gb == 0xC000)) {
        break;
      }
      rgns.push(rgn);
      cursor = rgn.next.adjusted
    }
    return rgns;
  }

  getUint8(addr) { return this.data.getUint8(addr.sram) }
  setUint8(addr, value) { return this.data.setUint8(addr.sram, value) }
  getUint16(addr) { return this.data.getUint16(addr.sram, true) }
  setUint16(addr, value) { return this.data.setUint16(addr.sram, value, true) }
  getUint32(addr) { return this.data.getUint32(addr.sram, true) }
  setUint32(addr, value) { return this.data.setUint32(addr.sram, value, true) }

  fileAt(index) {
    const addr = new Addr({sram: this.getUint16(this.indexPos.add(index * 4))});
    if (addr.sram === 0) {
      return null;
    }
    const owner = this.getUint8(this.indexPos.add(index * 4 + 3));
    if (owner === 1) {
      return new KissFile(KISS_MAIL_STUB);
    }
    const size = this.getUint16(addr);
    return new KissFile(this.data.buffer.slice(addr.sram, addr.add(size).sram));
  }

  swapFilesAt(index1, index2) {
    const index1Addr = this.indexPos.add(index1 * 4);
    const index2Addr = this.indexPos.add(index2 * 4);
    const index1Entry = this.getUint32(index1Addr);
    const index2Entry = this.getUint32(index2Addr);
    this.setUint32(index1Addr, index2Entry);
    this.setUint32(index2Addr, index1Entry);
  }

  delFileAt(index) {
    const indexAddr = this.indexPos.add(index * 4);
    const rgnAddr = new Addr({sram: this.getUint16(indexAddr)}).sub(RGN_HEADER_SIZE);
    let rgn = RegionHeader.read(this.data, rgnAddr);

    // Set the region type to $46 (free space).
    this.setUint8(rgn.addr, RGN.FREE);
    this.setUint8(rgn.addr.add(1), RGN.FREE ^ 0xFF);

    // Merge this region into previous, if previous region is free too.
    if ((rgn.prev !== null) && (rgn.addr.bank === rgn.prev.bank)) {
      const prev = RegionHeader.read(this.data, rgn.prev);
      if (prev.type === RGN.FREE) {
        rgn = new RegionHeader(RGN.FREE, prev.addr, prev.prev, rgn.next);
        this.setUint16(rgn.addr.add(4), rgn.next.gb);
      }
    }

    // Merge next region into this, if next region is free too.
    if (rgn.next.gb !== 0xC000) {
      const next = RegionHeader.read(this.data, rgn.next)
      if (next.type === RGN.FREE) {
        rgn = new RegionHeader(RGN.FREE, rgn.addr, rgn.prev, next.next);
        this.setUint16(rgn.addr.add(4), rgn.next.gb);
      }
    }

    // Ensure next region points to this.
    // There is always a next region, because only special regions are final.
    this.setUint16(rgn.next.adjusted.add(2), rgn.addr.gb);

    // Zero out the entry in the index.
    this.setUint32(indexAddr, 0);
  }

  addFileAt(index, kissFile) {
    const diamond = (kissFile.flags & 0x06) === 0x06;

    let regions = this.getRegions()
                      .filter(rgn => rgn.type === RGN.FREE)
                      .filter(rgn => rgn.size >= kissFile.size);
    if (!regions.length) {
      throw new Error(`Insufficient SRAM space: no block of size ${kissFile.size} available`);
    }
    if (diamond) {
      regions = regions.filter(r => r.addr.gb == 0xA002);
      if (!regions.length) {
        throw new Error("Insufficient SRAM space: no unused bank available for diamond-type file");
      }
    }
    let rgn = regions.reduce((a, b) => (a.addr.sram > b.addr.sram) ? a : b, regions[0])

    // Split region if large enough: if it has space for another header
    // even if there would be zero space remaining for a region body.
    // Even though that region would not itself be useful,
    // if would be possible to merge into the following region,
    // if the file in the following region were to be deleted.
    if (rgn.size >= (kissFile.size + RGN_HEADER_SIZE)) {
      let addr2 = null;
      if (diamond) {
        addr2 = rgn.body.add(kissFile.size);
      } else {
        addr2 = rgn.next.sub(kissFile.size + RGN_HEADER_SIZE);
      }

      const region1 = new RegionHeader(RGN.FREE, rgn.addr, rgn.prev, addr2);
      this.setUint16(region1.addr.add(4), region1.next.gb);

      const region2 = new RegionHeader(RGN.FREE, addr2, rgn.addr, rgn.next);
      this.setUint8(region2.addr, region2.type);
      this.setUint8(region2.addr.add(1), region2.type ^ 0xFF);
      this.setUint16(region2.addr.add(2), region2.prev.gb);
      this.setUint16(region2.addr.add(4), region2.next.gb);

      this.setUint16(region2.next.adjusted.add(2), region2.addr.gb);

      rgn = diamond ? region1 : region2;
    }

    const type = diamond ? RGN.ZERO : RGN.REGULAR;
    this.setUint8(rgn.addr, type);
    this.setUint8(rgn.addr.add(1), type ^ 0xFF);
    u8(this.data.buffer).set(u8(kissFile.data.buffer), rgn.body.sram);

    const indexAddr = this.indexPos.add(index * 4);
    this.setUint16(indexAddr, rgn.body.sram);
    this.setUint8(indexAddr.add(2), kissFile.cartId);
    this.setUint8(indexAddr.add(3), kissFile.ownerId);
  }

  toDataUrl() { return toDataUrl(this.data.buffer); }
};

class Editor {
  constructor(parent) {
    this.saveFile = null;
    this.panel = makeElement("div");

    this.buttons = {
      load: {
        init: el => {
          return makeElement("button", {
            innerText: "Load",
            eventListeners: {
              click: async e => {
                const file = await selectFile(".sav");
                if (file) {
                  await this.openFile(file, this.panel);
                }
              },
            },
          });
        },
      },
      save: {
        init: el => {
          return makeElement("button", {
            innerText: "Save",
            eventListeners: {
              click: async e => {
                downloadUrl("gbkiss.sav", await this.saveFile.toDataUrl());
              },
            },
          });
        },
      },
      close: {
        init: el => {
          return makeElement("button", {
            innerText: "Close",
            eventListeners: {
              click: e => {this.close()},
            },
          });
        },
      },
    };

    const buttons = makeElement("div");
    Object.values(this.buttons).forEach(button => {
      button.element = button.init();
      buttons.appendChild(button.element);
    });

    parent.replaceChildren(buttons, this.panel);
  }

  figureFor(index, file) {
    return makeElement("div", {
      className: "figure",
      draggable: true,
      eventListeners: {
        dragstart: e => {
          e.dataTransfer.setData("application/x-gbkiss-index", index);
          e.dataTransfer.setData("text/plain", `GBKiss file at index ${index}`);
        },
      },
      drop: async e => {
        if (e.dataTransfer.getData("application/x-gbkiss-index")) {
          const fromIndex = parseInt(e.dataTransfer.getData("application/x-gbkiss-index"));
          if (index == fromIndex) {
            return;
          }
          this.saveFile.swapFilesAt(index, fromIndex);
          this.listFiles();
        } else if (e.dataTransfer.items.length) {
          await this.addFile(index, await e.dataTransfer.items[0].getAsFile());
        } else if (e.dataTransfer.files.length) {
          await this.addFile(index, await e.dataTransfer.files[0]);
        } else {
          await runModal(["No file was dropped"], ["OK"]);
        }
      },
      children: [
        makeElement("img", {
          draggable: false,
          style: "width: 64px; height: 48px",
          src: (file ? file.iconUrl : EMPTY_ICON) || BROKEN_ICON,
        }),
        makeElement("form", {
          children: file ?
              [
                this.infoButton(index, file),
                this.downloadButton(index, file),
                this.removeButton(index, file),
              ] :
              [
                this.installButton(index),
                this.uploadButton(index),
              ],
        }),
        file ? makeElement("p", {innerText: file.title}) : "",
      ],
    });
  }

  infoButton(index, file) {
    return makeElement("button", {
      children: [makeElement("img", {
        src: "/edit/info.svg",
        alt: "Get file info",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        click: e => {
          e.preventDefault();
          runModal(
              [
                makeElement("h3", {innerText: file.title}),
                makeElement("ul", {
                  children: [
                    makeElement("li", {
                      innerText: `Size: ${Math.floor((file.size + 255) / 256)} blocks (${
                          file.size} bytes)`,
                    }),
                    makeElement("li", {children: ["Type: ", typeIcon(file)]}),
                    file.hasHistory ? makeElement("li", {innerText: `Author: ${file.author}`}) :
                                      "",
                    makeElement("li", {
                      children: [
                        "Owner Code: ",
                        makeElement("tt", {innerText: hexByte(file.ownerId)}),
                      ],
                    }),
                  ],
                }),
              ],
              ["Close"]);
        },
      },
    });
  }

  downloadButton(index, file) {
    return makeElement("button", {
      disabled: file.ownerId === 1,
      children: [makeElement("img", {
        src: "/edit/download.svg",
        alt: `Download file`,
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        click: async e => {
          e.preventDefault();
          downloadUrl(file.title + ".gbf", await file.toDataUrl());
        },
      },
    });
  }

  removeButton(index, file) {
    return makeElement("button", {
      disabled: file.ownerId === 1,
      children: [makeElement("img", {
        src: "/edit/remove.svg",
        alt: "Remove file",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        click: e => {
          e.preventDefault();
          this.saveFile.delFileAt(index);
          this.listFiles();
        },
      },
    });
  }

  installButton(index) {
    return makeElement("button", {
      children: [makeElement("img", {
        src: "/edit/install.svg",
        alt: "Install known file",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        click: async e => {
          e.preventDefault();
          const h3 = makeElement("h3", {innerText: "Install GBKiss file"});
          const largest = this.saveFile.getRegions()
                              .filter(rgn => rgn.type === RGN.FREE)
                              .map(rgn => rgn.size)
                              .reduce((a, b) => (a > b) ? a : b, 0)
          const p = makeElement("p", {innerText: `Largest available block: ${largest} bytes`});
          const select = makeElement("select", {
            children: Object.entries(FILES).map(
                ([k, v]) => makeElement("option", {value: v, innerText: k})),
          });
          if (await runModal([h3, p, select], ["Install", "Cancel"]) == "Cancel") {
            return;
          }
          const url = select.value;
          const resp = await window.fetch(url);
          if (!resp.ok) {
            runModal([makeElement("h3", {innerText: `Failed to load ${url}`})], ["OK"]);
            return;
          }
          await this.addFile(index, await resp.blob());
        },
      },
    });
  }

  uploadButton(index) {
    return makeElement("button", {
      children: [makeElement("img", {
        src: "/edit/upload.svg",
        alt: "Upload file",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        click: async e => {
          e.preventDefault();
          const file = await selectFile(".gbf");
          if (file === null) {
            return;
          }
          await this.addFile(index, file);
        },
      },
    });
  }

  async addFile(index, blob) {
    let kissFile = null;
    const buffer = await blob.arrayBuffer();
    try {
      kissFile = new KissFile(buffer);
    } catch (e) {
      console.log(e);
      await runModal([makeElement("h3", {innerText: "Malformed GBKiss file"})], ["OK"]);
      return;
    }
    if (this.saveFile.fileAt(index) !== null) {
      this.saveFile.delFileAt(index);
    }
    try {
      this.saveFile.addFileAt(index, kissFile);
    } catch (e) {
      console.log(e);
      await runModal(
          [makeElement("h3", {innerText: e.name}), makeElement("p", {innerText: e.message})],
          ["OK"]);
      return;
    }
    this.listFiles();
  }

  async openFile(file) {
    const buffer = await file.arrayBuffer();
    try {
      this.saveFile = new SaveFile(buffer);
    } catch (e) {
      console.log(e);
      runModal(
          [
            makeElement("h3", {innerText: "GBKiss save data not found"}),
            makeElement("ul", {
              children: [
                makeElement("li", {innerText: "Is this file a Game Boy save file?"}),
                makeElement("li", {innerText: "Is the associated game GBKiss-enabled?"}),
                makeElement("li", {innerText: "Has the owner info been initialized?"}),
              ],
            }),
          ],
          ["OK"]);
      return;
    }
    this.listFiles();
    this.fixButtons();
  }

  listFiles() {
    const contents = makeElement("div", {className: "gallery-small"});
    let emptyCount = 0;
    this.saveFile.files.forEach((file, i) => {
      if (!file) {
        ++emptyCount;
        if (emptyCount === 1) {
          contents.appendChild(this.figureFor(i, null));
        }
        return;
      }
      for (let j = 1; j < emptyCount; ++j) {
        contents.appendChild(this.figureFor(i - emptyCount + j, null));
      }
      emptyCount = 0;
      contents.appendChild(this.figureFor(i, file));
    });
    this.panel.replaceChildren(contents);
  }

  async close() {
    this.saveFile = null;

    const dropbox = makeElement("div", {
      className: "bordered",
      innerText: "Load file or drop here to edit",
      drop: async e => {
        if (e.dataTransfer.items.length) {
          await this.openFile(e.dataTransfer.items[0].getAsFile());
        } else if (e.dataTransfer.files.length) {
          await this.openFile(e.dataTransfer.files[0]);
        } else {
          await runModal(["No file was dropped"], ["OK"]);
        }
      },
    });
    this.fixButtons();
    this.panel.replaceChildren(dropbox);
  }

  fixButtons() {
    this.buttons.load.element.disabled = (this.saveFile !== null);
    this.buttons.save.element.disabled = (this.saveFile === null);
    this.buttons.close.element.disabled = (this.saveFile === null);
  }
};

document.addEventListener("DOMContentLoaded", e => {
  new Editor(document.getElementById("editor")).close();
});
