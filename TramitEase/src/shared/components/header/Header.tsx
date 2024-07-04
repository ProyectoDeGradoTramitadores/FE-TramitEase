import LogoBlack from "../../assets/logo/black/LogoBlack.tsx";
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
    return (
        <div>
            <LogoBlack size={"m"} color={"primary"}/>
            <MenuIcon fontSize={"large"}/>
            <div>
                hola
            </div>
        </div>
    );
};

export default Header;
