import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import gs from '../../css/global.module.css'
import {useRouter} from 'next/router';

export default function PrivacyPolicy() {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://app.soundverse.io' : 'https://testflight.soundverse.io';

  return (
    <div>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Read how we handle user data here." />
        <meta property="og:title" content="Privacy Policy" />
        <meta property="og:description" content="Read how we handle user data here." />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className={gs.h1}>Privacy Policy</div>
          <br />
          <p>
            Greetings and thank you for visiting soundverse.io (the
            &quot;Website&quot;). It is important to us to protect your privacy.
            <br />
            <br />
            The purpose of this Privacy Policy (the &quot;Policy&quot;) is to
            describe the types of information that Simulatech FZC collects and
            uses. In your visit to the Website and the products, features,
            materials, and services we provide (collectively with the Website,
            the &quot;Services&quot;), (the &quot;Company&quot;, &quot;us&quot;,
            or &quot;our&quot;) may collect information from you or that you may
            provide. Additionally, this Policy describes the ways in which we
            collect, use, maintain, protect, and disclose that information. We
            collect information about you on this Website as well as through
            your use of our Services (including when you register for an
            account), as well as through any communication between us and you
            (including email, text, and other electronic messages).
            <br />
            <br />
            This Policy does not apply to information collected by third
            parties, including any websites, services, and applications that you
            elect to access through the Services. Please review this Policy
            carefully. By accessing or using the Services (or by clicking on
            “accept” or “agree” to this Policy when prompted), you agree to the
            terms of this Policy on behalf of yourself or the entity or
            organization that you represent. You should refrain from using our
            Services if you do not agree with any of the terms in this Policy.
          </p>
          <br />
          <br />
          <p>
            <div className={gs.h3}>
              1. Children Using or Accessing the Services.
            </div>
            <br />
            Children under the age of thirteen (13), as well as the Services and
            their content, are not intended for or directed at them. The
            Services do not allow anyone under the age of thirteen (13) to
            provide any personal information. The information we collect from
            children under the age of thirteen (13), is not knowingly collected
            by us. No information about yourself, including your name, address,
            telephone number, or email address, should be sent to us if you are
            under the age of thirteen (13). We will immediately take steps to
            ensure that any personally identifiable information we have
            inadvertently collected or received from a child under the age of
            thirteen (13), will be deleted from our system&apos;s database if
            that information is discovered. Parents and legal guardians should
            contact us at office@soundverse.io if they suspect their child has
            given us personal information under thirteen (13) years of age.
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>2. Changes to Our Privacy Policy.</div>
            <br />
            The date at the top of this page indicates the last time this Policy
            was revised. This Policy may be updated from time to time. Any
            material changes to this Policy will be posted on this page and
            notified to you via email or through a notice on the Website home
            page if we make such changes. When we make changes to the Services,
            you are deemed to have accepted those changes, so make sure to
            review the Policy periodically.
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>A. Information and Content You Give Us.</div>
            <br />
            We collect personal information that you knowingly choose to
            disclose. Information that may be collected includes: (i) Personal
            Information. Any information you directly provide us on or through
            the Services, such as your name, address, e-mail address, username,
            password, etc. Registration, account creation, and customer service
            requests. (ii) Email correspondence. If you choose to correspond
            with us by email, we will keep a record of your emails, your email
            address, and our responses. (iii) User Content. The content or
            information you submit for publication or display on public areas of
            the Services or for transmission to other users of the Services or
            third parties (&quot;User Content&quot;). Posting and transmitting
            your User Content is at your own risk. The Company cannot control
            the actions of other users of the Services with whom you may choose
            to share your User Content. Therefore, we cannot and do not
            guarantee that your User Content will not be viewed by unauthorized
            persons.(iv) Transaction Information. Information about any purchase
            or transactions made on the Services. This includes payment
            information, such as your credit or debit card number and other card
            information; other account and authentication information; and
            billing, shipping, and contact details.
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>
              B. Information We Collect Automatically.
            </div>
            <br />
            As you interact with the Services, we may collect certain
            information about your equipment, browsing actions, and patterns,
            including:(i) Activity Information. Visitor information, which
            includes the types of content you view and engage with, the features
            you use, the actions you take, the people or accounts with whom you
            interact, your time, frequency, and duration of your activities.
            Information about the equipment you use (ii). iii) Location
            information about your computer and internet connection, such as the
            operating system of your computer, your IP address, the type and
            language of your browser. Information about the location of your
            device, including GPS location, for purposes of enhancing or
            facilitating the Services. These information may be used to enable
            the Services to direct you to nearby stores or to allow you to pay
            for them remotely.
            <br />
            <br />
            Also, your device&apos;s location may be used to provide you with
            more relevant advertising and to understand how the Services and
            functionality are used. Additionally, we may use the information we
            collect to maintain the quality of our Services in addition to
            providing general statistics about their use.
            <br />
            <br />
            For this automatic data collection, we may use the following
            technologies:
            <br />
            <br />
            (i) Cookies. The term &quot;cookie&quot; refers to a small file that
            is stored either temporarily (&quot;session cookies&quot;) or
            permanently (&quot;persistent cookies&quot;). Cookies contain
            information that can later be read by a web server. For a more
            personalized and interactive experience on the Services, we may use
            cookies.
            <br />
            <br />
            (ii) Web Beacons. In addition to &quot;clear gifs&quot;, &quot;pixel
            tags&quot;, &quot;web bugs&quot;, and &quot;single-pixel gifs&quot;,
            web beacons are small files embedded in webpages, applications, and
            emails. For example, web beacons can be used by the Company to track
            who visits its webpages or opens its emails, to evaluate the
            effectiveness of our marketing, and for other related website
            statistics.
            <br />
            <br />
            (iii) JavaScripts. There are many ways in which JavaScript code can
            be embedded into a website or application. They can be used to
            accelerate the refresh rate of certain components or to monitor how
            they are used.
            <br />
            <br />
            (iv) Entity Tags. When the website is opened, the web server
            validates these caches, accelerating website performance since the
            web server does not have to send a full response if the
            website&apos;s content hasn&apos;t changed. Entity Tags are HTTP
            code mechanisms that allow portions of websites to be stored or
            &quot;cached&quot; within your browser.
            <br />
            <br />
            (v) HTML5 Local Storage. With HTML5 local storage, you can store or
            &quot;cached&quot; data from websites within your browser so that
            you can retrieve it when you visit the website in the future.
            <br />
            <br />
            (vi) Resettable Device Identifiers. Many mobile devices and tablets
            have resettable device identifiers (also referred to as
            &quot;advertising identifiers&quot;), which are similar to cookies
            (for example, Apple&apos;s &quot;Identifier for Advertisers&quot; or
            &quot;IDFA&quot; and Google&apos;s &quot;Google Advertising
            ID&quot;) and certain streaming media devices. Like cookies,
            resettable device identifiers are used to make online advertising
            more relevant. Like cookies, resettable device identifiers are used
            to make online advertising more relevant.
            <br />
            <br />
            This Policy does not cover the use of tracking technologies by third
            parties.
            <br />
            <br />
            Adverts, ad networks, server providers, content providers, and
            application providers may link to, advertise on, or reference other
            websites through the Services. During your use of the Services,
            these third parties may use cookies or other tracking technologies
            to collect information about you. These companies may collect
            information about your online activities over time and across
            different websites or they may collect information about your
            personal information.
            <br />
            <br />
            We are not responsible for the use of these third-party tracking
            technologies. It is thus not the responsibility of the Company to
            comply with the privacy policies, practices, or procedures of third
            parties. It is recommended that you review the privacy statements
            and terms and conditions of any linked or referenced websites you
            visit. You should contact the responsible provider directly if you
            have questions about an ad or other targeted content.
            <br />
            <br />
            As you interact with the Services, we may collect certain
            information about your equipment, browsing actions, and patterns,
            including:
            <br />
            <br />
            (i) (i) Activity Information. (i) Activity Information.
            Visitors&apos; information, such as what content they view, what
            features they use, what actions they take, who they interact with,
            and when, how often, and how long they engage with the service.
            <br />
            <br />
            (ii). iii) This information includes the operating system, IP
            address, type and language of your browser, and the operating system
            of your computer. Information about the location of your device,
            including GPS location, for purposes of enhancing or facilitating
            the Services. This information may be used to enable the Services to
            direct you to nearby stores or to allow you to pay for them
            remotely.
            <br />
            <br />
            We may also use the location of your device to understand how the
            Services and functionality are being used and to provide more
            relevant advertising to you based on your location. As well as
            providing general statistics about the use of our Services, we may
            use the information we collect to maintain our Services&apos;
            quality. The following technologies may be used to collect this
            automatic data: (i) Cookies, which are small files that are stored
            on your computer&apos;s hard drive either temporarily (&quot;session
            cookies&quot;) or permanently (&quot;persistent cookies&quot;).
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>C. Demographic Information.</div>
            <br />
            In some cases, we may collect information about you that does not
            personally identify you, such as demographics, statistical data, or
            other aggregate information. Some of this information may be derived
            from personal information, but it is not personal information and
            cannot be tied back to you. Gender, age, race, household income, and
            political affiliation are examples of aggregate information.
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>D. Information from Other Sources.</div>
            <br />
            We may receive information about you from other sources and add it
            to our account information. We protect this information according to
            the practices described in this Policy, plus any additional
            restrictions imposed by the source of the data. These sources may
            include online and offline data providers, from which we obtain
            demographic, interest-based, and online advertising related data;
            publicly-available sources such as open government databases or
            social networks; and service providers who provide us with
            information, or updates to that information, based on their
            relationship with you. By gathering additional information about
            you, we can correct inaccurate information, enhance the security of
            your transactions, and give you product or service recommendations
            and special offers that are more likely to interest you.
            <br />
            <br />
            4. How We Use Your Information.
            <br />
            provide the Services and its content to you; <br />
            Provide customer service and respond to comments and questions;
            <br />
            The information you provide will be used for the purpose for which
            you provided it (iii); <br /> (iv) communicate with you about your
            order, purchase, account, or subscription; <br />
            (vi) operate, maintain, improve, personalize, and analyze the
            Services; <br />
            (v) inform you of important changes to the Services or any of their
            features or content; For marketing or advertising purposes, monitor
            and analyze trends, usage, and activities; <br /> (viii)
            investigating security breaches, fraud, and other illegal activity;
            <br /> (ix) carry out our obligations and enforce our rights arising
            from any contracts entered into between you and us, including for
            billing and collection; For internal administrative purposes,
            maintain appropriate records; <br /> (Xi) make it possible for you
            to interact with the Services; <br /> Communicate with the public
            about features, newsletters, offers, promotions, contests, and
            events; As part of this effort, the Company will share information
            across its products and devices in order to offer you a more
            tailored and consistent experience across the entire Company&apos;s
            product line. <br /> (xiv) collect and analyze data, conduct surveys
            and research, and test and troubleshoot new products and features;
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>5. How We Share Your Information.</div>
            <br />
            We may disclose aggregated or anonymized information about our users
            without any restrictions. We will not share your personal
            information that we collect or you provide as described in this
            Policy except in the following circumstances:
            <br />
            <br />
            (A) With subsidiaries and affiliates for business purposes. We may
            share information with our subsidiaries and affiliates for business
            purposes, such as management and analysis, decision-making, and
            other business activities.
            <br />
            <br />
            (B) When we work with service providers. Service providers,
            contractors, and other third parties that provide us with support
            services may receive personal information, such as credit card
            processing, website hosting, email and postal delivery, location
            mapping, product and service delivery, or analytics. We entrusted
            them with contractual obligations to keep personal information
            confidential and use it only for the purposes we disclosed it to
            them.
            <br />
            <br />
            (C) It is possible for us to become involved in a merger,
            divestiture, restructuring, reorganization, dissolution, or other
            sale or transfer of a Company&apos;s assets to businesses or people
            involved in the negotiation or transfer (whether as a going concern
            or as part of a bankruptcy, liquidation, or similar proceeding).
            <br />
            <br />
            (D) When we are required by law. To comply with any court order,
            law, or legal process, including to respond to any government or
            regulatory request.
            <br />
            <br />
            (E) When we enforce our rights. To enforce or apply this Policy, our
            Terms of Use, and other agreements, including for billing and
            collection purposes.
            <br />
            <br />
            (F) As a means of protecting lawful interests. Our users, partners,
            agents, and others&apos; rights, property, or safety may be
            protected by disclosure. As part of this process, we exchange
            information with other companies and organizations in order to
            prevent fraud, spam, and malware attacks.
            <br />
            <br />
            (G)To fulfill the purpose for that information or with your consent.
            You may provide us with information for any purpose you specify, as
            well as any other purpose we disclose when you provide the
            information.
            <br />
            <br />
            (H) The marketing service providers we work with assess, develop,
            and provide you with promotional offers, contests, sweepstakes, and
            events, as well as other promotional opportunities that may be of
            interest to you. The information you post to or through the public
            areas of the Services (e.g., chat rooms, bulletin boards, and
            discussion groups) Users of the Services are encouraged to exercise
            caution when providing personal information about themselves in
            public or interactive areas, as it may be collected and used by
            others, resulting in unsolicited messages or other contact.
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>6. Your Choices.</div>
            <br />
            6.1 Mechanisms to Control Your Information. Our goal is to offer you
            a choice regarding the personal information you provide us. In order
            to ensure that you have control over the information we gather about
            you, we&apos;ve created the following mechanisms: (i) Cookies &
            Other Tracking Technologies, You may be able to set your browser to
            reject cookies and certain other technologies by adjusting the
            appropriate settings in your browser, Different browsers have
            different preferences, but many of the most common ones allow you to
            choose whether or not cookies and other technologies are accepted or
            rejected before they are set or installed, or if you wish to
            eliminate or reject the use or installation of certain technologies.
            For more information on how to modify your browser settings, please
            refer to the Help menu in your browser. The Services may not be
            accessible if cookies are disabled or refused, (i) Promotional
            Communications cannot be sent if cookies are disabled or refused. We
            allow you to opt-out of having your contact information used to
            promote our own or third-party products and services by (i) letting
            us know at the time you sign up for our newsletter or fill out any
            other form on or through the Services in which we collect your data,
            or by (ii) completing any other form on or through the Services; If
            you wish to opt-out, you may do so by (iii) checking or unchecking
            the relevant boxes in your account profile; (iv) following the
            opt-out instructions in the promotional emails we send to you; or
            (v) sending us an email. Please note that we may still send you
            transactional communications, such as account or purchase-related
            emails, even if you opt-out of receiving promotional communications.
            You can set a privacy preference called &quot;Do Not Track&quot; in
            most web browsers. The Do Not Track browser preference indicates to
            websites that you do not wish to be tracked, Please note that we
            currently do not respond to Do Not Track browser preferences.
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>
              7. Accessing and Correcting Your Information.
            </div>
            <br />
            Any personal information you have provided may be accessed,
            corrected, or removed by sending us an email. You can also access,
            correct, or delete your personal information by logging into the
            Website and visiting your account profile page, We cannot delete
            your personal information except by also deleting your account,
            Requests for information to be changed may not be accommodated.
            Deleted User Content from the Services or your account may remain
            viewable in cached and archived pages, or other users may have
            copied or stored copies of your User Content if we believe it
            violates any law or legal requirement or causes the information to
            be inaccurate.
            <br />
            <br />
            <br />
          </p>
          <p>
            <div className={gs.h3}>8. How We Protect Your Information.</div>
            <br />
            The security of your personal information is of the utmost
            importance to us. Furthermore, your information is safe and secure
            because you are responsible for keeping these passwords confidential
            when we provide you (or where you choose) a password to access
            certain parts of the Services. Despite our efforts to safeguard your
            personal information, no system or network can be completely secure.
            Please do not share your password with anyone. At any time, the
            security of user information may be compromised by an unauthorized
            party. Additionally, your information is protected because you are
            responsible for keeping your password confidential when you are
            given (or choose) a password for accessing certain parts of the
            Services. Obtainable from the Website or any other service.
            <br />
            <br />
            <br />
          </p>
        </main>
      </Layout>
    </div>
  )
}
