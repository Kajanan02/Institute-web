import React from 'react';
import Layout from "../../layout/layout";

function Settingss(props) {
    return (
        <Layout>
            <div className='heading'>Settings</div>
           <div className="page-wrapper bg-gra-03 p-t-25">
        <div className="wrapper wrapper--w790">
            <div className="card card-5 settings_card">
                <div className="card-heading">
                    <h2 className="title">Profile</h2>
                </div>
                <div className="settings_card-body">
                    <form method="POST">
                        <div className="form-row">                    
                        </div>
                        <div className="form-row">
                            
                            <div className="name">First Name</div>
                            <div className="value">                                    
                                        <div className="input-group-desc">
                                            <input className="input--style-5 settings_input " type="text" name="first_name"/>                                                                                    
                                        </div>                    
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="name">Last Name</div>
                            <div className="value">
                                <div className="settings_input-group">
                                    <input className="input--style-5 settings_input" type="text" name="company"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Email</div>
                            <div className="value">
                                <div className="settings_input-group">
                                    <input className="input--style-5 settings_input" type="text" name="company"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Phone Number</div>
                            <div className="value">
                                <div className="settings_input-group">
                                    <input className="input--style-5 settings_input" type="email" name="email"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row m-b-55">
                            <div className="name">Address</div>
                            <div className="value">                                    
                                        <div className="input-group-desc">
                                            <input className="input--style-5 settings_input" type="text" name="phone"/>
                                        </div>                              
                            </div>
                        </div>


                        <button type="sumbit" className="btn btn-success btn-rounded settings_btn">Update Profile</button>

                        
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div className="page-wrapper-1 p-t-10 card_align">
        <div className="wrapper wrapper--w790">
            <div className="card card-5 card_align settings_card">
                <div className="card-heading_1">
                    <h2 className="title_1">Password</h2>
                </div>
                <div className="card-body_1">
                    <form method="POST">
                       
                        <div className="form-row">
                            
                            <div className="name">Current Password</div>
                            <div className="value">                                    
                                        <div className="settings_input-group_1">
                                            <input className="input--style-5 settings_input" type="password" name="Currentpassword"/>                                                                                    
                                        </div>
                                   
                                
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="name">New Password</div>
                            <div className="value">
                                <div className="settings_input-group_1">
                                    <input className="input--style-5 settings_input" type="password" name="Newpassword"/>
                                </div>
                            </div>
                        </div>
                                             
                       

                        <button type="sumbit" className="btn btn-success btn-rounded settings_btn">Update Password</button>

                        
                    </form>
                </div>
            </div>
        </div>
    </div>



        </Layout>
    );
}

export default Settingss;