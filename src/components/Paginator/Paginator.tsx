import React, {useState} from "react";
import classes from "./Paginator.module.css"
import classNames from "classnames"


const Paginator: React.FC<PropsType> = ({
                                            totalItemsCount,
                                            pageSize,
                                            currentPage = 1,
                                            onPageChanged = x => x,
                                            portionSize = 5
                                        }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    return <div className={classes.container}>
        <ul className={classes.paginatorWrap}>
            {portionNumber > 1 &&
                <div className={classes.navigationElement}>
                    <p onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}>&#11013;</p>
                </div>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <div key={p} className={classes.pageNumberWrap}>
                        <li className={classNames({
                            [classes.selectedPage]: currentPage === p
                        }, classes.pageNumber)}
                            key={p} onClick={(e) => {
                            onPageChanged(p)
                        }
                        }> {p} </li>
                    </div>
                })}
            {portionCount > portionNumber &&
                <div className={classes.navigationElement}>
                    <p onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>&#10145;</p>
                </div>
            }

        </ul>
    </div>
}

export default Paginator


type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (offset: number) => void
    portionSize?: number
}


// -===========================================================================

/*
* import React, {useState} from "react";
import classes from "./Paginator.module.css"
import classNames from "classnames"


const Paginator: React.FC<PropsType> = ({
                                            totalItemsCount,
                                            pageSize,
                                            currentPage = 1,
                                            onPageChanged = x => x,
                                            portionSize = 5
                                        }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages: Array<number> = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(currentPage)
    const leftPortionPageNumber = currentPage <= 0 ? 1 : currentPage - Math.floor(portionSize / 2)
    const rightPortionPageNumber = currentPage >= pagesCount ? pagesCount : currentPage + Math.floor(portionSize / 2)
    // const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    // const rightPortionPageNumber = portionNumber * portionSize
    console.log(leftPortionPageNumber, rightPortionPageNumber)
    console.log(`c: ${portionCount}\nn: ${portionNumber}`)
    // const isRightPlace = (index: number, left: number, right: number): boolean => {
    //     console.log(index >= left && index <= right && right >= currentPage)
    //     return index >= left && index <= right && right >= currentPage
    // }

    return (
        <div className={classes.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - portionSize)
                }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={classNames({
                            [classes.selectedPage]: currentPage === p
                        }, classes.pageNumber)}
                              key={p} onClick={(e) => {
                            onPageChanged(p)
                        }
                        }> {p} </span>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + portionSize)
                }}>NEXT</button>}
        </div>
    )
}

export default Paginator

// =====================================================================================================================

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (offset: number) => void
    portionSize?: number
}
*
*
* */