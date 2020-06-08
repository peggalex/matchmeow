"use strict";

var isMobile = () => window.matchMedia("(orientation: portrait)").matches;

function SlideshowNode({
  index,
  selected,
  goto
}) {
  let className = 'slideshowNode';
  if (index == selected) className += ' selected';
  return /*#__PURE__*/React.createElement("button", {
    onClick: isMobile() ? () => {} : goto,
    "aria-hidden": "true",
    className: className
  });
}

var getHeightCenter = $el => $el.offset().top - $el.height() / 2;

var distance = (x, y) => Math.abs(x - y);

var getHeightDist = ($el1, $el2) => distance(getHeightCenter($el1), getHeightCenter($el2));

function Slideshow({
  startIndex = 0,
  children
}) {
  let slideshowImagesRef = React.useRef(null);
  let [state, dispatch] = React.useReducer((state, action) => {
    if (slideshowImagesRef.current == null) return state;
    let $slideshowImages = $(slideshowImagesRef.current);
    let children = $slideshowImages.children().toArray();

    switch (action.type) {
      case 'scroll':
        let centerDist = $el => getHeightDist($el, $slideshowImages);

        var func = (accIndex, child, index) => {
          let $accChild = $(children[accIndex]);
          return centerDist($accChild) < centerDist($(child)) ? accIndex : index;
        };

        let closestIndex = children.reduce(func, 0);
        return {
          index: closestIndex
        };

      case 'goto':
        let gotoIndex = action.index;
        let $child = $(children[gotoIndex]);
        let scrollTo = getHeightCenter($child) + $slideshowImages.scrollTop();
        $slideshowImages.scrollTop(scrollTo);
        return {
          index: gotoIndex
        };

      default:
        return state;
    }
  }, {
    index: startIndex
  });
  let slideshowNodes = children.map((_, i) => /*#__PURE__*/React.createElement(SlideshowNode, {
    key: i,
    index: i,
    selected: state.index,
    goto: () => dispatch({
      type: 'goto',
      index: i
    })
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "slideshow row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slideshowImages col centerCross",
    onScroll: () => dispatch({
      type: 'scroll'
    }),
    ref: slideshowImagesRef
  }, children.map((el, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "slideshowElContainer col center"
  }, el))), /*#__PURE__*/React.createElement("div", {
    className: "slideshowNodesContainer col"
  }, 10 > children.length && children.length > 1 ? slideshowNodes : []));
}