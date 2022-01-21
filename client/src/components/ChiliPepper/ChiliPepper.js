import Chili from "../../assets/images/chili.svg"
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function ChiliPepper() {
    const media = useMediaQuery('(max-width:1024px)')

    return <img width={media ? "20" : "25"} src={Chili} alt="Piment" />
}
