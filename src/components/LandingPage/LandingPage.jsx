import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            The information provided on pulseshare.org (the “site”) is for general informational purposes only and cannot and does not contain medical/health advice.
            The use of this website is not a substitute for professional medical or health advice. Accordingly, before taking any actions based upon information on 
            this website, we (the administrators of the site) encourage you to consult with appropriate medical or health professionals.
            All information on the site is provided in good faith, however administrators for the site make no representation or warranty of any kind, 
            express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.  
            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.  
            Your use of the site and your reliance on any information on the site is solely at your own risk.
          </p>

          <p>
            The site may contain links to other websites, or content belonging to or originating from third parties, or links to websites and features in banners or other advertising.  
            Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.  
            We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through 
            the site or any website or feature linked in any banner or other advertising.  We will not be a party to or in any way responsible for monitoring any transaction 
            between you and third-party providers of products or services.
          </p>

          <p>
            The site may contain data, photographs, videos, personal accounts, and/or testimonials by users of products and/or services.  
            These data, photographs, videos, personal accounts and/or testimonials are personal to those particular users, and may 
            not necessarily be representative of others.  We do not claim, and you should not assume, that all users will have the same experiences. 
            Your individual results may vary.  Further the data, photographs, videos, personal accounts, and/or testimonials on the site 
            are submitted in various forms such as text, audio and/or video and may contain errors or omissions.  While some content may 
            have been edited for content or clarity, others will be posted in unedited form.  The administrators reserve the right to edit 
            or delete content at their discretion.
          </p>

          <p>
            The views and opinions contained in the data, photographs, videos, personal accounts, and/or testimonials belong only to 
            the individual user and do not reflect the site views and opinions.  We are not affiliated with users who provide this information 
            and users are not paid or otherwise compensated for it.  The data, photographs, videos, personal accounts and/or testimonials on 
            the site are not intended nor should they be construed as claims that any products and/or services can be used to diagnose, treat, 
            mitigate, cure, prevent, or otherwise be used for any disease or medical condition, or to improve physiologic functioning.
          </p>

          <p>
            If you choose to post your own information on this website including data, experiences, photographs, testimonials or video, 
            you acknowledge that you are posting it into a public domain where it will be freely available to anyone who can access the internet.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
