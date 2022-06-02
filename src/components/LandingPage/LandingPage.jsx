import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// imports for MUI v5
import {
  Box,
  Container,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Modal,
  Typography,
  TextField,
  FormControl,
  Avatar,
  ListItem,
  List,
  Divider,
  ListItemAvatar,
  ListItemText
} from '@mui/material';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome To Pulse Share');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Container 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>{heading}</h1>

      <Box 
        component={Paper}
          sx={{
              padding: '15px',
              borderRadius: '7px',
              border: '1px solid black',
              boxShadow: 10,
              marginTop: '15px',
              textAlign: 'center'
              // minWidth: '60vw',
              // maxWidth: '60vw',
          }}
      >
        <h3>Disclaimer</h3>
        <Typography>
        The information provided on pulseshare.org (the “site”) is for general informational purposes only and cannot and does not contain medical/health advice.
            The use of this website is not a substitute for professional medical or health advice. Accordingly, before taking any actions based upon information on 
            this website, we (the administrators of the site) encourage you to consult with appropriate medical or health professionals.
            All information on the site is provided in good faith, however administrators for the site make no representation or warranty of any kind, 
            express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.  
            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.  
            Your use of the site and your reliance on any information on the site is solely at your own risk.
            The site may contain links to other websites, or content belonging to or originating from third parties, or links to websites and features in banners or other advertising.  
            Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.  
            We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through 
            the site or any website or feature linked in any banner or other advertising.  We will not be a party to or in any way responsible for monitoring any transaction 
            between you and third-party providers of products or services.
            The site may contain data, photographs, videos, personal accounts, and/or testimonials by users of products and/or services.  
            These data, photographs, videos, personal accounts and/or testimonials are personal to those particular users, and may 
            not necessarily be representative of others.  We do not claim, and you should not assume, that all users will have the same experiences. 
            Your individual results may vary.  Further the data, photographs, videos, personal accounts, and/or testimonials on the site 
            are submitted in various forms such as text, audio and/or video and may contain errors or omissions.  While some content may 
            have been edited for content or clarity, others will be posted in unedited form.  The administrators reserve the right to edit 
            or delete content at their discretion.
            The views and opinions contained in the data, photographs, videos, personal accounts, and/or testimonials belong only to 
            the individual user and do not reflect the site views and opinions.  We are not affiliated with users who provide this information 
            and users are not paid or otherwise compensated for it.  The data, photographs, videos, personal accounts and/or testimonials on 
            the site are not intended nor should they be construed as claims that any products and/or services can be used to diagnose, treat, 
            mitigate, cure, prevent, or otherwise be used for any disease or medical condition, or to improve physiologic functioning.
            If you choose to post your own information on this website including data, experiences, photographs, testimonials or video, 
            you acknowledge that you are posting it into a public domain where it will be freely available to anyone who can access the internet.
        </Typography>
      </Box>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // alignItems: 'center',
        }}
      >
        <Box
          component={Paper}
          sx={{
            padding: '15px',
            borderRadius: '7px',
            border: '1px solid black',
            boxShadow: 10,
            marginTop: '15px',
            textAlign: 'center',
            mr: '5px',
            minWidth: '50%',
            maxWidth: '50%',
          }}
        >
          <h3>Learn More</h3>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <Box>
              <img height='100px' src="https://spinal-stim-forum-test-bucket.s3.us-east-2.amazonaws.com/9a5116b1d45c0833.jpeg" alt="Medtronic Webpage" />
            </Box>
            <Box
              sx={{
                maxWidth: '400px'
              }}
            >
              <a
                target="_blank"
                href='https://www.medtronic.com/us-en/patients/treatments-therapies/spinal-cord-stimulation-chronic-pain/therapy-overview.html?cmpid=PPC_Goog_Q3_adgrp_Gen_H1_Spin_Cord_H2_Watc_the%20_H3_Expl_Trea_SCS_Patient_Pan_Pain_Patient_FY22'
                sx={{
                  overflow: 'auto',
                }}
              >
                Medtronic Webpage
              </a>
            </Box>
          </Box>
          <br/>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <Box>
              <img height='100px' src="https://spinal-stim-forum-test-bucket.s3.us-east-2.amazonaws.com/fc512b7a98a28f16.jpeg" alt="Medtronic Webpage" />
            </Box>
            <Box
              sx={{
                maxWidth: '400px'
              }}
            >
              <a
                target="_blank"
                href='https://www.bostonscientific.com/en-US/medical-specialties/pain-management/wavewriter-alpha-scs.html?gclsrc=aw.ds&gclid=CjwKCAjwyryUBhBSEiwAGN5OCLjnQ-8BR6_JER4YFdUYuf1682JbsaknXv2rlwYGQffM-_1KwFJvDhoCMi0QAvD_BwE'
                sx={{
                  overflow: 'auto',
                }}
              >
                Boston Scientific Webpage
              </a>
            </Box>
          </Box>
        </Box>
        <Box
          component={Paper}
          sx={{
            padding: '15px',
            borderRadius: '7px',
            border: '1px solid black',
            boxShadow: 10,
            marginTop: '15px',
            textAlign: 'center',
            ml: '5px',
            // maxWidth: '60vw',
          }}
        >
          <h3>What is SCS?</h3>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LandingPage;