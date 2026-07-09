import { useDispatch } from "react-redux"
import { setAuthInfo } from "../store/auth.slice"
import { deleteToken } from "../server/auth.action";
import { useRouter } from "next/navigation";

export default function useLogout(){
    const dispatch=useDispatch()
    const router = useRouter()
    const logout=()=>{
        dispatch(
            setAuthInfo({isAuthinticated: false , userInfo:null})
        );

        deleteToken();

        router.push('/login')
        router.refresh()
    }

    return {logout}
}