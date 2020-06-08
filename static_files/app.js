"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isMobile = () => window.matchMedia("(orientation: portrait)").matches;

function alertError(xhr, status, error) {
  alert(`${error}: ${xhr.responseText}`);
}

;

function arrayRemove(array, element) {
  let index = array.indexOf(element);
  if (index != -1) array.splice(index, 1);
}

async function waitForAjaxCall(method, url) {
  url = url.replace(/[ \t\n]/g, ''); // get rid of empty spaces and newlines

  return new Promise((resolve, reject) => $.ajax({
    method: method,
    url: url
  }).done(resolve).fail((data, _, error) => {
    reject(alertError(data, _, error));
  }));
}

var preferredGender = ''; //male, female, <empty string>

var interval = 10; //seconds

const initialProfiles = 1;

function getProfileObj() {
  return waitForAjaxCall('GET', `${location.href}getProfile/${preferredGender}`);
}

class Icons {} // =======================================================
// =======================================================
// =======================================================


_defineProperty(Icons, "heart", /*#__PURE__*/React.createElement("svg", {
  className: "heart",
  width: "23px",
  height: "20px",
  viewBox: "0 0 23 20",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(-38.000000, -200.000000)"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(0.000000, 168.000000)"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(0.000000, 21.000000)",
  fill: "#444444"
}, /*#__PURE__*/React.createElement("path", {
  d: "M58.5921775,12.44255 C55.9956951,10.2734974 51.9841746,10.5993016 49.5,13.1120107 C47.0158189,10.5993016 43.0042984,10.2690343 40.407816,12.44255 C37.0296934,15.2676741 37.5238337,19.8735635 39.9316444,22.3148635 L47.8109355,30.2903717 C48.2601539,30.7456049 48.8621066,31 49.5,31 C50.1423791,31 50.7398396,30.750068 51.189058,30.2948348 L59.068349,22.3193265 C61.4716676,19.8780266 61.9747922,15.2721371 58.5921775,12.44255 Z"
}))))));

_defineProperty(Icons, "paw", /*#__PURE__*/React.createElement("svg", {
  className: "paw",
  width: "26px",
  height: "23px",
  viewBox: "0 0 26 23",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, /*#__PURE__*/React.createElement("g", {
  id: "-",
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(-35.000000, -289.000000)"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(0.000000, 168.000000)"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(0.000000, 84.000000)"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(35.000000, 37.000000)",
  fill: "#DFCDD6",
  fillRule: "nonzero"
}, /*#__PURE__*/React.createElement("path", {
  d: "M13.0002539,9.85734968 C8.96775695,9.85734968 3.25035572,16.1596612 3.25035572,20.1378799 C3.25035572,21.9295927 4.61178682,23 6.89336455,23 C9.3734949,23 11.0111731,21.712431 13.0002539,21.712431 C15.0066001,21.712431 16.6488486,23 19.1071433,23 C21.388721,23 22.7501521,21.9295927 22.7501521,20.1378799 C22.7501521,16.1596612 17.0327509,9.85734968 13.0002539,9.85734968 Z M5.52126951,9.20997147 C4.99315002,7.43109321 3.36613576,6.27905777 1.8874012,6.63637358 C0.408666646,6.99368938 -0.361676872,8.72533624 0.166442613,10.5042145 C0.694562098,12.2830928 2.32157636,13.4351282 3.80031091,13.0778124 C5.27904547,12.7204966 6.04938899,10.9888497 5.52126951,9.20997147 L5.52126951,9.20997147 Z M9.82341208,8.1431579 C11.3945675,7.72526269 12.1806531,5.57931432 11.5794094,3.35019761 C10.9781656,1.1210809 9.21709029,-0.346686176 7.64593482,0.0712090331 C6.07477935,0.489104243 5.28869381,2.63505262 5.88993753,4.86416932 C6.49118125,7.09328603 8.25276442,8.5615665 9.82341208,8.1431579 Z M24.1125988,6.63688696 C22.6338642,6.27957116 21.0073578,7.4316066 20.4787305,9.21048486 C19.950611,10.9893631 20.7209545,12.72101 22.1996891,13.0783258 C23.6784236,13.4356416 25.3049301,12.2836061 25.8335574,10.5047279 C26.3616769,8.72584963 25.5913334,6.99420277 24.1125988,6.63688696 L24.1125988,6.63688696 Z M16.1770957,8.1431579 C17.7482512,8.56105311 19.5093266,7.09328603 20.1105703,4.86416932 C20.711814,2.63505262 19.9257285,0.489617627 18.354573,0.0712090331 C16.7834175,-0.347199561 15.0223422,1.1210809 14.4210984,3.35019761 C13.8198547,5.57931432 14.6059403,7.72526269 16.1770957,8.1431579 Z",
  id: "Shape"
}))))))));

_defineProperty(Icons, "settings", /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "feather feather-settings settings"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
})));

_defineProperty(Icons, "mapPin", /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "feather feather-map-pin mapPin"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "3"
})));

_defineProperty(Icons, "cross", /*#__PURE__*/React.createElement("svg", {
  focusable: "false",
  className: "svg-inline--fa fa-times fa-w-11",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 352 512"
}, /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
})));

function Settings({
  hideSettings
}) {
  let [intervalState, setIntervalState] = React.useState(interval);
  let [preferredGenderState, setPreferredGenderState] = React.useState(preferredGender);
  React.useEffect(() => {
    interval = intervalState;
  }, [intervalState]);
  React.useEffect(() => {
    preferredGender = preferredGenderState;
  }, [preferredGenderState]);
  return /*#__PURE__*/React.createElement("div", {
    id: "settingsContainer",
    className: "center centerCross"
  }, /*#__PURE__*/React.createElement("div", {
    id: "settings",
    className: "col center centerCross"
  }, /*#__PURE__*/React.createElement("h2", null, "Settings"), /*#__PURE__*/React.createElement("label", null, "preferred gender"), /*#__PURE__*/React.createElement("select", {
    value: preferredGenderState,
    onChange: e => {
      let el = e.target;
      setPreferredGenderState(el.options[el.selectedIndex].value);
    }
  }, ['', 'male', 'female'].map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s))), /*#__PURE__*/React.createElement("label", null, "update frequency (secs)"), /*#__PURE__*/React.createElement("input", {
    onChange: e => {
      setIntervalState(parseInt(e.target.value));
    },
    type: "number",
    min: "5",
    value: intervalState
  }), /*#__PURE__*/React.createElement("button", {
    onClick: hideSettings
  }, "\u2715"), /*#__PURE__*/React.createElement("p", {
    id: "intervalNote"
  }, "interval will update next cycle")));
}

function FavouriteTab({
  name,
  surname
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "favouriteTab row centerCross"
  }, Icons.paw, /*#__PURE__*/React.createElement("p", null, name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, surname)));
}

function Profile({
  profile: {
    name,
    surname,
    location,
    age,
    imageSrc,
    quote
  },
  removeProfile,
  toggleFav,
  isFav
}) {
  let imgContainerRef = React.useRef(null);
  React.useEffect(() => {
    let imgContainer = imgContainerRef.current;
    if (imgContainer === null) return;
    let img = $(`
			<img 
				class="profilePicture" 
				alt="${name} ${surname}'s profile picture" 
				src="${imageSrc}"
			/>
		`)[0];

    img.onload = () => imgContainer.appendChild(img);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "profileContainer row center centerCross"
  }, /*#__PURE__*/React.createElement("button", {
    className: "closeButton",
    "aria-label": `close profile for ${name} ${surname}`,
    onClick: removeProfile
  }, Icons.cross), /*#__PURE__*/React.createElement("div", {
    className: "profile col"
  }, /*#__PURE__*/React.createElement("div", {
    ref: imgContainerRef,
    className: ".imgContainer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "profileInfo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "upper"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "profileName"
  }, name, " ", /*#__PURE__*/React.createElement("span", {
    className: "pink"
  }, surname)), /*#__PURE__*/React.createElement("div", {
    className: "secondaryInfo row"
  }, /*#__PURE__*/React.createElement("p", {
    className: "profileAge"
  }, age), /*#__PURE__*/React.createElement("p", {
    className: "profileAddress"
  }, location), Icons.mapPin)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    className: "lower"
  }, /*#__PURE__*/React.createElement("img", {
    className: "quotationMark",
    "aria-hidden": "true",
    src: "./quotes.png"
  }), /*#__PURE__*/React.createElement("p", {
    className: "profileQuote"
  }, quote)))), /*#__PURE__*/React.createElement("button", {
    onClick: toggleFav,
    className: 'favButton ' + (isFav ? 'selected' : ''),
    "aria-label": `favorite profile for ${name} ${surname}`
  }, Icons.heart));
}

function MobileTabs({
  hideFav,
  setHideFav
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: "showFavSelector",
    className: "row"
  }, /*#__PURE__*/React.createElement("button", {
    className: hideFav ? '' : 'selected',
    "aria-label": "open favourites tab",
    onClick: () => setHideFav(false)
  }, "Favourites"), /*#__PURE__*/React.createElement("button", {
    className: !hideFav ? '' : 'selected',
    "aria-label": "open profiles tab",
    onClick: () => setHideFav(true)
  }, "Profiles"));
}

function Header() {
  let [isShowSettings, setShowSettings] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "row centerCross"
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo",
    alt: "matchmeow logo",
    src: "matchmeowLogo.svg"
  }), /*#__PURE__*/React.createElement("h1", null, "matchme", /*#__PURE__*/React.createElement("span", {
    className: "pink"
  }, "ow")), /*#__PURE__*/React.createElement("button", {
    id: "settingsIconContainer",
    "aria-label": "open settings menu",
    onClick: () => setShowSettings(true)
  }, Icons.settings)), isShowSettings ? /*#__PURE__*/React.createElement(Settings, {
    hideSettings: () => setShowSettings(false)
  }) : null);
}

function App() {
  let [hideFav, setHideFav] = React.useState(isMobile());
  let [favourites, setFavourites] = React.useState([]);
  let [profiles, setProfiles] = React.useState([]);

  let newProfile = async () => {
    let profileObj = await getProfileObj();
    setProfiles(previousState => [profileObj, ...previousState]); // we need the up-to-date previous state incase we delete anything
  };

  let [timeoutState, setTimeoutState] = React.useState(-1);
  React.useEffect(() => {
    if (timeoutState > 0) return; // we already have a timeout event

    setTimeoutState(window.setTimeout(() => {
      newProfile().then($('.slideshowImages').scrollTop(0));
      setTimeoutState(-1);
    }, interval * 1000)); //interval is in seconds
  }, [timeoutState]);
  React.useEffect(() => {
    if (profiles.length > 0) return;

    for (let i = 0; i < initialProfiles; i++) {
      newProfile();
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement(Header, null), !isMobile() ? null : /*#__PURE__*/React.createElement(MobileTabs, {
    hideFav: hideFav,
    setHideFav: setHideFav
  }), /*#__PURE__*/React.createElement("section", {
    className: "row"
  }, isMobile() && hideFav ? null : /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "heading row centerCross"
  }, Icons.heart, /*#__PURE__*/React.createElement("h2", null, "Favourites")), favourites.map(fav => /*#__PURE__*/React.createElement(FavouriteTab, {
    key: fav.name + fav.surname,
    name: fav.name,
    surname: fav.surname
  }))), isMobile() && !hideFav ? null : /*#__PURE__*/React.createElement(Slideshow, null, profiles.map(profile => {
    let removeProfile = () => {
      arrayRemove(favourites, profile);
      arrayRemove(profiles, profile);
      setProfiles([...profiles]);
    };

    let toggleFav = () => {
      if (favourites.includes(profile)) {
        arrayRemove(favourites, profile);
      } else {
        favourites.push(profile);
      }

      setFavourites([...favourites]);
    };

    return /*#__PURE__*/React.createElement(Profile, {
      key: JSON.stringify(profile),
      profile: profile,
      removeProfile: removeProfile,
      toggleFav: toggleFav,
      isFav: favourites.includes(profile)
    });
  }))));
}