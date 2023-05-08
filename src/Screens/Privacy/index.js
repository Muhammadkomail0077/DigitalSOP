import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import HTML from 'react-native-render-html';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../App/api';
import {getRequest} from '../../App/fetch';

export const Privacy = () => {
  const htmlContent = `<h2 style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 2.25rem;font-family: Roboto, sans-serif;"><strong>Is Privacy Policy Required by Law?</strong></span></h2>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Yes, a privacy policy is required for your website by law in most countries. The specifics and clauses that should be in the policy will be different depending on many factors such as your location, your target audience, etc.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Some of the most notable privacy laws include the following:</span></p>
  <h3 style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: Roboto, sans-serif;"><strong>European Union</strong></span></h3>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">The European Union is known for having some of the strictest privacy laws in the world. The cornerstone of privacy legislation, the General Data Protection Regulation (GDPR) provides detailed information in articles 12, 13, and 14 in regard to privacy policies and the importance of facilitating the exercise of the rights that your users have over their data.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Wherever your company is located, if you operate in Europe or process the personal information of users located in Europe, you will need to</span> <a href="https://www.websitepolicies.com/blog/gdpr-privacy-policy" target="_self"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">comply with the GDPR</span></a> <span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">and thus have a privacy policy that is easy to understand and access. You must also ensure that you have your users’ unambiguous and affirmative consent before you start collecting any personal information.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">To be found GDPR-compliant, a privacy policy must contain some very specific elements. Unlike some other privacy laws, the GDPR is actively being enforced and the stakes are high for businesses that choose not to comply, with hefty fines in the millions of dollars.</span></p>
  <h3 style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: Roboto, sans-serif;"><strong>California, USA</strong></span></h3>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">While there is, to date, no privacy legislation at the federal level in the United States, the state of California has enacted its own in order to protect its constituents’ privacy.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">The California Online Privacy Protection Act (</span><a href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22575." target="_blank"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">CalOPPA</span></a><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">) provides that any commercial website that collects or uses personal information from Californian residents must have a conspicuously placed privacy policy that details how it is collected, used, and shared.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">In addition, the California Consumer Privacy Act (</span><a href="https://oag.ca.gov/privacy/ccpa" target="_blank"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">CCPA</span></a><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">) came into force in 2020 to supplement the CalOPPA. While its scope of application is more limited – as it is notably targeted to businesses that either have annual gross revenue of more than $25 million, make at least half of their revenue selling personal data of its users, or that sell, buy, share or receive personal information from at least 50,000 households, consumers or devices annually – it should still be taken into consideration.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">This piece of legislation encourages transparency and notably requires that businesses serve users with a notice at collection or before the time that it starts collecting personal information. That notice at collection should link to a privacy policy that is to be updated at least every year as well as have the</span> <a href="https://www.websitepolicies.com/blog/do-not-sell-personal-information-page" target="_self"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">option to opt-out</span></a><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">.</span></p>
  <h3 style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: Roboto, sans-serif;"><strong>Australia</strong></span></h3>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Australia regulates how businesses should handle personal information through its </span><a href="https://www.oaic.gov.au/privacy/the-privacy-act/" target="_blank"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Privacy Act of 1988</span></a><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Organizations that need to comply with the </span><a href="https://www.oaic.gov.au/privacy/australian-privacy-principles/read-the-australian-privacy-principles" target="_blank"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Australian Privacy Principles</span></a><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;"> i.e. generally businesses that have an annual turnover of more than $3 million (in addition, some other smaller organizations need to comply, such as those that buy or sell personal information or provide health services – make sure that you consult with a lawyer) notably need to have an up-to-date and clearly expressed privacy policy that is available free of charge, in an appropriate format and that contains all the information required under this Act.</span></p>
  <h3 style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: Roboto, sans-serif;"><strong>Other Countries</strong></span></h3>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">These examples are solely used to show you what some countries across the globe require when it comes to collecting personal information from their residents but many other privacy laws and regulations exist and they each have their own particularities.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,247,222);font-size: 18px;font-family: Roboto, sans-serif;">It is imperative that you make sure you are complying with the sets of laws and regulations applicable to your website before you start collecting and processing any kind of personal information.</span></p>
  <h2 style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 2.25rem;font-family: Roboto, sans-serif;"><strong>Why Does Your Website Need a Privacy Policy?</strong></span></h2>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Besides being required by law, there are some other reasons to have a privacy policy on your website. Some of these reasons include the following:</span></p>
  <h3 style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: Roboto, sans-serif;"><strong>It’s Required by Third-Party Services</strong></span></h3>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">You may not be aware of this, but most of the third-party services commonly used on websites require that you have a valid privacy policy in place in order to comply with their terms of service.</span></p>
  <p style="text-align:start;"><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">If you are using </span><a href="https://www.websitepolicies.com/blog/privacy-policy-for-google-adsense" target="_self"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Google AdSense</span></a><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;"> or </span><a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank"><span style="color: rgb(0,145,255);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">Google Analytics</span></a><span style="color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;">, for example, you must have a privacy policy that includes all the information that they require (including a clause regarding your use of cookies). Failure to do so means violating their terms, which could lead to you not being able to use their services.</span>&nbsp;</p>
  `;

  const {AuthReducer} = useSelector(state => state);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('Bearer ' + AuthReducer?.userData.token);
      setLoading(true);
      getRequest(
        `${BASE_URL}/front_end_setting/privacyPolicy`,
        `Bearer ${AuthReducer?.userData.token}`,
      )
        .then(res => {
          console.log('Response For Notificaton Data:', res);
          setLoading(false);
          setData(res.data);
          console.log('data:', data);
        })
        .catch(err => {
          console.log('Error For Notificaton Data: ', err);
          showError(err);
          setLoading(false);
        });
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} />;
  }

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:'15%',
          marginHorizontal:'3%',
          // backgroundColor: 'white',
        }}>
        {data && <HTML tagsStyles={tagsStyles} source={{html: htmlContent}} />}
      </View>
    </ScrollView>
  );
};

const tagsStyles = {
  // h1: {fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'black'},
  // h2: {fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'black'},
  // strong: {fontWeight: 'bold'},
};
