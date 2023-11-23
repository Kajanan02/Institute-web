import React, {useState, useEffect} from 'react';
import {Modal} from "react-bootstrap";

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [isModalVisible, setIsModalVisible] = useState(false);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the default behavior
            e.preventDefault();
            // Store the event to use it later
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Check if the app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
            setIsAppInstalled(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        if(width <= 768){
            setIsModalVisible(true)
        }else {
            setIsModalVisible(false)
        }
    }, [width]);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            // Show the installation prompt
            deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                // Reset the deferredPrompt state
                setDeferredPrompt(null);
            });
        }
    };

    if (isAppInstalled) {
        return null; // Render nothing if the app is already installed
    }





    return (
        <>
            {deferredPrompt && isModalVisible && (
                <Modal
                    show={deferredPrompt}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"

                >
                    <Modal.Header closeButton onHide={() => setDeferredPrompt(false)}>
                        <Modal.Title id="contained-modal-title-vcenter" className={"text-center"}>
                            Install our app for a better experience!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"text-center"}>
                    <button onClick={handleInstallClick} type="button px-5"
                            className={"btn btn-secondary students-dropdown-btn"}>Install
                    </button>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default PWAInstallPrompt;
