import React, {Suspense} from 'react'
import Preloader from "../common/Preloader/Preloader";

export function withSuspense <WCP>(WrappedComponent: React.ComponentType<WCP>){
    return (props: React.PropsWithChildren<WCP>) => {
        return <Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props}/>
        </Suspense>
    }
}
