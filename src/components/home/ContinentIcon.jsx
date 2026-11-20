import africa from "../../assets/illustrations/regions/africa.svg";
import americas from "../../assets/illustrations/regions/americas.svg";
import antarctica from "../../assets/illustrations/regions/antarctica.svg";
import asia from "../../assets/illustrations/regions/asia.svg";
import europe from "../../assets/illustrations/regions/europe.svg";
import oceania from "../../assets/illustrations/regions/oceania.svg";

const continentAssets = {
    Américas: americas,
    Europa: europe,
    Asia: asia,
    África: africa,
    Oceanía: oceania,
    Antártida: antarctica,
};

export function ContinentIcon({ continent }) {
    return <img className="continent-icon" src={continentAssets[continent]} alt="" />;
}
