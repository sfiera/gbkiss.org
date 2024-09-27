const u8 = x => new Uint8Array(x);
const cc = x => x.charCodeAt(0);
const obj = Object.fromEntries;

const RGN_HEADER_SIZE = 6;
const RGN = obj(["FREE", "REGULAR", "ZERO", "SPECIAL"].map(x => [x, cc(x)]));

const KISS_MAIL_STUB = u8("\17\0\6\0\12\1KISS MAIL".split("").map(cc)).buffer;

const FILES = [
  "bakechu-relay/baketu.gbf",
  "biorhythm/biorythm.gbf",
  "blackjack/bj.gbf",
  "binary/bland.gbf",
  "cannon-ball/cannon.gbf",
  "char-dump/chardump.gbf",
  "delete-all/del_all.gbf",
  "calculator/dentaku.gbf",
  "drive/drive.gbf",
  "family-shot/family_s.gbf",
  "icon-edit/iconedit.gbf",
  "icon-send/iconsend.gbf",
  "kiss-mon-2/kissmon2.gbf",
  "kiss-mon/kissmon.gbf",
  "puzzle-game/koura1.gbf",
  "puzzle-game/koura2.gbf",
  "puzzle-game/koura3.gbf",
  "magnets/mag_data.gbf",
  "magnets/magnets.gbf",
  "mogutte-nanbo/mogura.gbf",
  "mail/passwords.gbf",
  "poker/poker.gbf",
  "puzzle-game/puzzle.gbf",
  "roulette/roulette.gbf",
  "saita/saita.gbf",
  "samegame/samegame.gbf",
  "mogutte-nanbo/sezaki.gbf",
  "shot/shot.gbf",
  "slot/slot.gbf",
  "sound-test/soundtst.gbf",
  "sram-get-and-clear/sramtool.gbf",
  "watch-and-timer/sw_data.gbf",
  "watch-and-timer/sw_timer.gbf",
  "worm/worm.gbf",
];

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
    } else if (key === "ondrop") {
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
const [h3, p, ul, li, tt] = ["h3", "p", "ul", "li", "tt"].map(
    tag => ((...children) => makeElement(tag, {children: children})));

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
    onchange: e => {resolve(e.target.files[0])},
    oncancel: e => {resolve(null)},
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
  const dlog = makeElement("dialog", {children: children});

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

const showErr = e => {
  console.log(e);
  runModal([h3(e.name), p(e.message)], ["OK"]);
};

class Addr {
  constructor(value) {
    if (value < 0 || 0x8000 < value) {
      throw new Error(`invalid addr: ${value}`);
    }
    this.sram = value;
  }

  static fromGB(bank, gb) {
    if ((bank < 0) || (4 <= bank)) {
      throw new Error(`invalid addr bank: ${bank}`);
    } else if ((gb <= 0xA000) || (0xC000 < gb)) {
      throw new Error(`invalid mapped addr: ${gb}`);
    }
    return new Addr((bank << 13) + (gb - 0xA000));
  }
  static fromSRAM(value) { return new Addr(value) }

  get bank() { return (this.sram - 1) >> 13 }
  get gb() { return ((this.sram - 1) & 0x1FFF) + 0xA001 }
  get adjusted() { return this.gb === 0xC000 ? this.add(2) : this }

  add(offset) { return new Addr(this.sram + offset) }
  sub(offset) { return new Addr(this.sram - offset) }
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
    const prev = (addr.gb !== 0xA002) ? Addr.fromGB(addr.bank, prevGb) :
        (addr.bank > 0)               ? Addr.fromGB(addr.bank - 1, prevGb) :
                                        null;
    const nextGb = dataView.getUint16(addr.sram + 4, true);
    const next = Addr.fromGB(addr.bank, nextGb);
    return new RegionHeader(type, addr, prev, next);
  }

  write(dataView) {
    dataView.setUint8(this.addr.sram, this.type);
    dataView.setUint8(this.addr.sram + 1, this.type ^ 0xFF);
    if (this.prev !== null) {
      dataView.setUint16(this.addr.sram + 2, this.prev.gb, true);
    }
    dataView.setUint16(this.addr.sram + 4, this.next.gb, true);
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

    const regions = this.getRegions();
    if (regions.filter(rgn => rgn.type == RGN.SPECIAL).length !== 2) {
      throw new Error(`missing special regions`);
    }
    regions.slice(1).reduce((prev, curr) => {
      if (prev.addr.sram !== curr.prev.sram) {
        throw new Error(`invalid prev pointer: ${prev.addr.sram} != ${curr.prev.sram}`);
      } else if (
          (prev.addr.bank === curr.addr.bank) && (prev.type === RGN.FREE) &&
          (curr.type === RGN.FREE)) {
        throw new Error(`consecutive free regions: ${prev.addr.sram}, ${curr.addr.sram}`);
      }
      return curr;
    }, regions[0]);

    const indexRgn = regions[regions.length - 2];
    const profileRgn = regions[regions.length - 1];
    if ((indexRgn.type !== RGN.SPECIAL) || (indexRgn.type !== RGN.SPECIAL)) {
      throw new Error("last 2 regions must be special");
    } else if (indexRgn.size !== 480) {
      throw new Error(`index is wrong size: ${indexRgn.size}`);
    } else if (profileRgn.size < 122) {
      throw new Error(`profile is truncated: ${profileRgn.size}`);
    }

    this.indexAddr = indexRgn.body;
    this.profileAddr = profileRgn.body;
  }

  getFiles() {
    const list = [];
    for (let i = 0; i < 120; ++i) {
      list.push(this.getFileAt(i));
    }
    return list;
  }

  getRegions() {
    let cursor = Addr.fromSRAM(0x0002);
    const rgns = [];
    while (true) {
      let rgn = RegionHeader.read(this.data, cursor);
      rgns.push(rgn);
      if ((rgn.type === RGN.SPECIAL) && (rgn.next.gb === 0xC000)) {
        break;
      }
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

  getFileAt(index) {
    const addr = Addr.fromSRAM(this.getUint16(this.indexAddr.add(index * 4)));
    if (!addr.sram) {
      return null;
    }
    const owner = this.getUint8(this.indexAddr.add(index * 4 + 3));
    if (owner === 1) {
      return new KissFile(KISS_MAIL_STUB);
    }
    const size = this.getUint16(addr);
    return new KissFile(this.data.buffer.slice(addr.sram, addr.add(size).sram));
  }

  swapFilesAt(index1, index2) {
    const index1Addr = this.indexAddr.add(index1 * 4);
    const index2Addr = this.indexAddr.add(index2 * 4);
    const index1Entry = this.getUint32(index1Addr);
    const index2Entry = this.getUint32(index2Addr);
    this.setUint32(index1Addr, index2Entry);
    this.setUint32(index2Addr, index1Entry);
  }

  delFileAt(index) {
    const indexAddr = this.indexAddr.add(index * 4);
    let rgn = RegionHeader.read(
        this.data, Addr.fromSRAM(this.getUint16(indexAddr)).sub(RGN_HEADER_SIZE));
    rgn.type = RGN.FREE;

    // Merge this region into previous, if previous region is free too.
    if ((rgn.prev !== null) && (rgn.addr.bank === rgn.prev.bank)) {
      const prev = RegionHeader.read(this.data, rgn.prev);
      if (prev.type === RGN.FREE) {
        prev.next = rgn.next;
        rgn = prev;
        rgn.write(this.data);
      }
    }

    // Merge next region into this, if next region is free too.
    if (rgn.next.gb !== 0xC000) {
      const next = RegionHeader.read(this.data, rgn.next)
      if (next.type === RGN.FREE) {
        rgn = new RegionHeader(RGN.FREE, rgn.addr, rgn.prev, next.next);
        rgn.next = next.next;
      }
    }

    // Ensure next region points to this.
    // There is always a next region, because only special regions are final.
    const next = RegionHeader.read(this.data, rgn.next.adjusted);
    next.prev = rgn.addr;

    rgn.write(this.data);
    next.write(this.data);

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
      const addr2 =
          diamond ? rgn.body.add(kissFile.size) : rgn.next.sub(kissFile.size + RGN_HEADER_SIZE);
      const rgn1 = new RegionHeader(RGN.FREE, rgn.addr, rgn.prev, addr2);
      const rgn2 = new RegionHeader(RGN.FREE, addr2, rgn.addr, rgn.next);
      const next = RegionHeader.read(this.data, rgn2.next.adjusted);
      next.prev = rgn2.addr;

      rgn1.write(this.data);
      rgn2.write(this.data);
      next.write(this.data);

      rgn = diamond ? rgn1 : rgn2;
    }

    rgn.type = diamond ? RGN.ZERO : RGN.REGULAR;
    rgn.write(this.data);
    u8(this.data.buffer).set(u8(kissFile.data.buffer), rgn.body.sram);

    const indexAddr = this.indexAddr.add(index * 4);
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
            onclick: async e => {
              const file = await selectFile(".sav");
              if (file) {
                await this.openFile(file, this.panel);
              }
            },
          });
        },
      },
      save: {
        init: el => {
          return makeElement("button", {
            innerText: "Save",
            onclick: async e => {
              downloadUrl("gbkiss.sav", await this.saveFile.toDataUrl());
            },
          });
        },
      },
      close: {
        init: el => {
          return makeElement("button", {
            innerText: "Close",
            onclick: e => {this.close()},
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
      ondragstart: e => {
        e.dataTransfer.setData("application/x-gbkiss-index", index);
        e.dataTransfer.setData("text/plain", `GBKiss file at index ${index}`);
      },
      ondrop: async e => {
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
        file ? p(file.title) : "",
      ],
    });
  }

  infoButton(index, file) {
    return makeElement("button", {
      title: "Get file info",
      children: [makeElement("img", {
        src: "/edit/info.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      onclick: e => {
        e.preventDefault();
        runModal(
            [
              h3(file.title),
              ul(li(`Size: ${Math.floor((file.size + 255) / 256)} blocks (${file.size} bytes)`),
                 li("Type: ", typeIcon(file)),
                 file.hasHistory ? li(`Author: ${file.author}`) : "",
                 li("Owner Code: ", tt(hexByte(file.ownerId)))),
            ],
            ["Close"]);
      },
    });
  }

  downloadButton(index, file) {
    return makeElement("button", {
      title: `Download file`,
      disabled: file.ownerId === 1,
      children: [makeElement("img", {
        src: "/edit/download.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      onclick: async e => {
        e.preventDefault();
        downloadUrl(file.title + ".gbf", await file.toDataUrl());
      },
    });
  }

  removeButton(index, file) {
    return makeElement("button", {
      title: "Remove file",
      disabled: file.ownerId === 1,
      children: [makeElement("img", {
        src: "/edit/remove.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      onclick: e => {
        e.preventDefault();
        this.saveFile.delFileAt(index);
        this.listFiles();
      },
    });
  }

  installButton(index) {
    return makeElement("button", {
      title: "Install known file",
      children: [makeElement("img", {
        src: "/edit/install.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      onclick: async e => {
        e.preventDefault();
        const title = h3("Install GBKiss file");
        const largest = this.saveFile.getRegions()
                            .filter(rgn => rgn.type === RGN.FREE)
                            .map(rgn => rgn.size)
                            .reduce((a, b) => (a > b) ? a : b, 0)
        const avail = p(`Largest available block: ${largest} bytes`);
        const select = makeElement("select", {
          children: FILES.map(f => makeElement("option", {value: f, innerText: f})),
        });
        if (await runModal([title, avail, select], ["Install", "Cancel"]) == "Cancel") {
          return;
        }
        const url = "/file/" + select.value;
        const resp = await window.fetch(url);
        if (!resp.ok) {
          runModal([h3(`Failed to load ${url}`)], ["OK"]);
          return;
        }
        await this.addFile(index, await resp.blob());
      },
    });
  }

  uploadButton(index) {
    return makeElement("button", {
      title: "Upload file",
      children: [makeElement("img", {
        src: "/edit/upload.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      onclick: async e => {
        e.preventDefault();
        const file = await selectFile(".gbf");
        if (file === null) {
          return;
        }
        await this.addFile(index, file);
      },
    });
  }

  async addFile(index, blob) {
    let kissFile = null;
    const buffer = await blob.arrayBuffer();
    try {
      kissFile = new KissFile(buffer);
    } catch (e) {
      throw new Error("Malformed GBKiss file", e);
    }
    if (this.saveFile.getFileAt(index) !== null) {
      this.saveFile.delFileAt(index);
    }
    this.saveFile.addFileAt(index, kissFile);
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
            h3("GBKiss save data not found"),
            ul(li("Is this file a Game Boy save file?"),
               li("Is the associated game GBKiss-enabled?"),
               li("Has the owner info been initialized?")),
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
    this.saveFile.getFiles().forEach((file, i) => {
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
      ondrop: async e => {
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
  window.addEventListener("error", e => {showErr(e.error)});
  window.addEventListener("unhandledrejection", e => {showErr(e.reason)});
  new Editor(document.getElementById("editor")).close();
});
