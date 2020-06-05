function SlideshowNode({index, selected, goto}){
    let className = 'slideshowNode';
    if (index == selected) className += ' selected';
    return <button onClick={goto} className={className}></button>;
}


var getHeightCenter = ($el) => $el.offset().top - $el.height()/2;
var distance = (x, y) => Math.abs(x-y);
var getHeightDist =($el1, $el2) => distance(getHeightCenter($el1), getHeightCenter($el2));

function Slideshow({slideshowElements, startIndex=0}){

    let slideshowImagesRef = React.useRef(null);

    let [state, dispatch] = React.useReducer((state, action) => {

        if (slideshowImagesRef.current == null) return state;

        let $slideshowImages = $(slideshowImagesRef.current);
        let children = $slideshowImages.children().toArray();

        switch(action.type){
            case 'scroll':
                let centerDist = ($el) => getHeightDist($el, $slideshowImages);

                var func = (accIndex, child, index) => {
                    let $accChild = $(children[accIndex]);
                    return (centerDist($accChild) < centerDist($(child))) ? accIndex : index;
                }
                let closestIndex = children.reduce(func, 0);

                return { index: closestIndex };

            case 'goto':
                let gotoIndex = action.index;
                let $child = $(children[gotoIndex]);
                let scrollTo = getHeightCenter($child) + $slideshowImages.scrollTop();
                $slideshowImages.scrollTop(scrollTo);

                return { index: gotoIndex };

            default: 
                return state;
        }
    }, { index: startIndex});

    let slideshowNodes = slideshowElements.map((_, i) => (
        <SlideshowNode key={i} index={i} selected={state.index} goto={
            ()=>dispatch({type: 'goto', index: i})
        }/>
    ));

    return (
        <div className='slideshow row'>
            <div 
                className='slideshowImages col centerCross' 
                onScroll={()=>dispatch({type: 'scroll'})}
                ref={slideshowImagesRef}>
                {slideshowElements.map((el)=>(
                    <div className='slideshowElContainer col center'>{el}</div>
                ))}
            </div>
            <div className='slideshowNodesContainer col'>
                {(slideshowElements.length > 1) ? slideshowNodes : []}
            </div>
        </div>
    );
}
