import CustomButton from "../CustomButton";
interface SessionExpiredPopupProps {
    action: Function
}

const SessionExpiredPopup = ({ action }: SessionExpiredPopupProps) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center session-expired-main ">
            <div className="bg-white shadow-md session-expired-container">
                <h2 className="session-expired-title">Your session is expired</h2>
                <p className="session-expired-description">Your session has expired. Please log in again.</p>
                <div className="flex items-center justify-center mt-8">
                    <CustomButton
                        label="Login"
                        background={'#F4A607'}
                        classname="custom-button-40-font-16-500 font-poppins mr-3 "
                        color={'#FFFFFF'}
                        onClick={() => action()}
                    />
                </div>
            </div>
        </div>
    );
};

export default SessionExpiredPopup;
