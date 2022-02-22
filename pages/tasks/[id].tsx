import {AppProps} from "next/app";
import {useRouter} from "next/router";

export default function TaskId({Component, pageProps}: AppProps): JSX.Element {
    const router = useRouter()
    const path = router.asPath
    return (
        <p>{path}</p>
    )
}
