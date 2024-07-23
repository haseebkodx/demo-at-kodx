import React, { useState, useEffect, useRef } from 'react'
import Sidebar from 'react-sidebar'

const SidebarComponent = props => {
    const {
        openState,
        sidebarRootId,
        isSideBarOnLeft,
        sidebarContent,
        sidebarClass,
        setCloseSideBarHandler,
        sideBarText
    } = props;

    const [showSideBar, setShowSideBar] = useState(false)

    const sidebarRootElRef = useRef()

    useEffect(() => {
        setCloseSideBarHandler(closeSideBar)
    }, [])

    useEffect(() => {
        setTimeout(() => setShowSideBar(openState), 250)
    }, [openState])

    useEffect(() => {
        sidebarRootElRef.current = document.getElementById(sidebarRootId)
        sidebarRootElRef.current && (sidebarRootElRef.current.onclick = event => {
            if (!event.srcElement.classList.contains('focusable-item')) {
                event.stopPropagation()
            }
        })
    }, [showSideBar])

    const closeSideBar = () => {
        setShowSideBar(false)
    }

    return (
        <>
            { openState &&

                <Sidebar
                    rootId={sidebarRootId}
                    open={showSideBar}
                    onSetOpen={setShowSideBar}
                    pullRight={isSideBarOnLeft}
                    sidebar={sidebarContent}
                    shadow={false}
                    sidebarClassName={sidebarClass}
                />
            }
            <div style={{ backgroundColor: 'lightgray', height: '100%', width: 35, position: 'absolute', top: 0, right: 0 }}></div>
            <div className="side-bar-text text-right">{sideBarText}</div>
        </>
    )
}

export default SidebarComponent