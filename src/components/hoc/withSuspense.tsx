import React, {Suspense} from 'react'


//  NEED ADD THE FALLBACK IN SUSPENSE

export function withSuspense <WCP>(WrappedComponent: React.ComponentType<WCP>){
    return (props: React.PropsWithChildren<WCP>) => {
        return <Suspense>
            <WrappedComponent {...props}/>
        </Suspense>
    }
}
