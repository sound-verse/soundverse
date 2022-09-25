import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import gs from '../../css/global.module.css'
import {useRouter} from 'next/router';

export default function TermsConditions() {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://main.soundverse.io' : 'https://testflight.soundverse.io';

  return (
    <div>
      <Head>
        <title>Terms of Service</title>
        <meta name="description" content="Read our terms of service here." />
        <meta property="og:title" content="Terms of Service" />
        <meta property="og:description" content="Read our terms of service here." />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className={gs.h1}>T&C Soundverse UAE</div>
          <br />
          <p>
            <div className={gs.h3}>
              1. Acceptance of NFT Terms; Modification of NFT Terms
            </div>
            <br />
            Welcome to the Soundverse NFT Platform owned and operated by
            Simulatech FZC, whose address is at Business Centre,Sharjah
            Publishing City Free Zone, Sharjah, United Arab Emiratesi, United
            Arab Emirates, registered under License No: 4203674.01 (“Company,”
            “we,” “us,” or “our”). These Terms and Conditions (“NFT Terms”)
            constitute a legally binding agreement between the Company and each
            registered or unregistered end user (each, a “User,” “you” or
            “your”) of the Soundverse NFT Platform located at Sounverse.io or
            such other URL as may be designated by Company from time to time, as
            well as any mobile apps or other related services or applications to
            it (collectively, the “NFT Platform”). By accessing or using the
            Platform, connecting your Digital Wallet or viewing, accessing,
            transmitting, transacting, uploading or downloading any information
            or content from the Platform and launching Soundverse rooms you
            represent and warrant that you have read and understood our terms of
            service. <br />
            <br />
            We may change or amend the NFT Platform or these NFT Terms at any
            time at our sole and absolute discretion. Any changes to these NFT
            Terms will be in effect as of the “LAST REVISED” date at the top of
            this page. You acknowledge and agree that the form and nature of the
            NFT Platform, and any part of it, may change from time to time
            without prior notice to you and that we may add new or remove
            existing features and change any part of the NFT Platform. <br />
            <br />
            IF ANY PROVISION OF THESE NFT TERMS OR ANY FUTURE CHANGES ARE
            UNACCEPTABLE TO YOU, DO NOT USE OR CONTINUE TO USE THE SOUND VERSE
            NFT PLATFORM. YOUR CONTINUED USE OF THE NFT PLATFORM FOLLOWING THE
            POSTING OF ANY NOTICE OF ANY CHANGE TO THESE TERMS OF SERVICE SHALL
            CONSTITUTE YOUR ACCEPTANCE AND AGREEMENT TO SUCH CHANGE.
          </p>
          <br />
          <br />
          <p>
            <div className={gs.h3}>2. What is Soundverse?</div>
            <br />
            <b>The Soundverse is a social and cultural Platform</b>. Soundverse
            operates a platform to connect artists and music rightsholders (
            <b>“Artists”</b>) with Users.
            <br />
            <br />
            Soundverse provides you with the opportunity to create (or as in
            technical terms we call it to mint), sell, purchase, bid on,
            collect, trade, showcase, and otherwise transact digital blockchain
            sound recordings, which may be represented as a non-fungible token
            (“NFT”) linked with certain digital media and art (“NFT Media”).
            Artists may use the Platform to create NFT collections of their
            music and to permit Users to listen to the Audio Content related to
            such NFTs on-demand.
            <br />
            <br />
            Soundverse is an online technical intermediary; it is not a party to
            any agreement between the buyer and seller of music NFTs. Soundverse
            is freely accessible to Users, but some functions of the Platform
            are only available to members owning certain NFTs or verified
            artists. If you are an Artist wishing to use the Platform to mint
            and sell your songs as an NFT, there is additional terms and
            conditions in the Appendix that applies (the “Artist Terms &
            Conditions”). Artists Terms & Conditions are part of overall
            platform term and conditions.
            <br />
            <br />
            <b>Smart-Contract: </b> Soundverse NFTs are represented in smart
            contracts on the Ethereum blockchain.
            <b>
              All these transactions on and off the Platform are recorded in an
              immutable ledger“Smart Contracts”.
            </b>
            <br />
            <br />
            Therefore, Any NFTs listed or traded within Soundverse platform are
            not under the control of any one party, including Soundverse. 
            Metamask, the Ethereum network, your browser, or any other
            third-party site, product, or service that you may access, visit or
            use to enable you to use the Platform are neither owned nor
            controlled by us.
            <br />
            <br />
            In no event will we be liable for third parties, acts or omissions,
            nor will we be liable for any damages you may suffer from your
            interactions with any third parties. When you engage in a
            transaction on the Platform, your Ethereum public address will be
            made public.
            <br />
            <br />
            Non-custodial.  Soundverse does not buy, sell, or ever take custody
            or possess any Soundverse NFTs. Users can purchase and collect NFTs
            through the Platform, but Soundverse does not own them.  To
            facilitate transactions on the Platform, Soundverse does not
            acquire, possess, or control any Soundverse NFTs or cryptocurrency
            by means of the Smart Contracts and users have full understanding on
            the nature of these transactions.  Soundverse is a non-custodial
            service provider and has designed the Platform so that Users can
            access it directly without Soundverse&apos;s involvement or
            involvement in any way. Purchasing an NFT gives you ownership of the
            NFT associated with certain NFT, but you do not own intellectual
            property rights ins such NFT except as expressly granted in this
            document.
            <br />
          </p>
          <br />
          <br />
          <p>
            <div className={gs.h3}>3. License to Your Content</div>
            <br />
            When you use the Soundverse platform, you may be able to upload or
            submit content to the NFT Marketplace. You may post, upload, or
            submit NFT Media related to the NFTs you wish to sell through the
            NFT Marketplace as a seller, as well as any other content related to
            your NFTs (&quot;Your Content&quot;).
            <br />
            <br />
            You retain all rights to Your Content you post, upload, submit, or
            otherwise made available through the NFT Marketplace, except for
            rights expressly granted herein. We must obtain from you certain
            license rights in Your Content so that actions we take in operating
            Soundverse platform are not considered illegal.
            <br />
            <br />
            For technical purposes (e.g., making sure content is viewable on
            smartphones as well as computers and other devices) You grant us a
            license to access, use, host, cache, store, copy, reproduce,
            transmit, display, publish, distribute, adapt and modify Your
            Content in any and all media or distribution methods (now know or
            later developed) but solely as required to be able to operate and
            provide services of the NFT Marketplace.
            <br />
            <br />
            You agree that this license includes the right for us to provide,
            promote, and improve the NFT Marketplace and to make Your Content
            available to other companies, organizations or individuals for the
            distribution, promotion or publication of Your Content on other
            media and services.
            <br />
            <br />
            As long as Your Content is stored with us you agree that these
            rights and licenses are royalty-free, transferable, sub-licensable,
            worldwide, and irrevocable.
            <br />
            <br />
            As part of this, we may make Your Content available to others with
            whom we have contractual relationships in relation to the provision
            of the NFT Marketplace, as well as pass along these rights to
            others. Providing the NFT Marketplace is the sole purpose for which
            we permit access to disclose Your Content to third parties if we
            determine that such access is necessary to comply with our legal
            obligations.
            <br />
            <br />
            Upon signing this license, you agree that the other Users of the NFT
            Marketplace may use, publish, display, modify, or include a copy of
            Your Content in their own use of the NFT Marketplace; however, the
            above shall not apply to any Content you post privately on the NFT
            Marketplace for non-public display.
            <br />
            <br />
            It is your responsibility to ensure that the rights granted herein
            for Your Content have been acquired or possessed by you, or that you
            have obtained the necessary rights and licenses.
            <br />
            <br />
            It is your responsibility to ensure that Your Content does not
            contain any materials protected by copyright or other proprietary
            rights unless you have the required permission or are otherwise
            legally entitled to post the material.
            <br />
            <br />
            You grant the buyer of an NFT through the Soundverse a royalty-free,
            non-exclusive, non-transferable, worldwide license to use, copy, and
            display the NFT Media for that purchased NFT, solely for the
            following purposes:
            <br />
            <br />
            The buyer can use the NFT Media for their personal use; or (b) on a
            marketplace that allows the purchase and sale of these NFTs,
            provided that the marketplace cryptographically verifies the rights
            of the NFT owners to display the NFT Media for their NFTs to ensure
            that only the actual owners have access to the NFT Media; or (You
            may include, involve, or participate your NFT in the third party
            website or application if that website/application cryptographically
            verifies that only the actual owner of each NFT has the right to
            display the NFT Media on their NFT, provided that the
            website/application cryptographically verifies that the NFT Media is
            not visible once the owner of each NFT leaves the
            website/application.”).
            <br />
            <br />
            If you are a buyer of NFTs, then you acknowledge and agree that the
            NFT Purchase License set forth above only lasts as long as you are
            the valid owner and holder of the NFT associated with the licensed
            NFT Media.
            <br />
            <br />
            NFT Purchase Licenses will be valid only during the period that you
            hold the NFT associated with the licensed NFT Media and are the
            valid owner and holder of the NFT.
            <br />
            <br />
            You will no longer be able to benefit from this NFT Purchase License
            if you sell or transfer the NFT to another person.
            <br />
            <br />
            A NFT or its related NFT Media cannot be publicly displayed,
            performed, distributed, sold, or otherwise reproduced for any
            commercial purpose without the written permission of the seller. The
            seller agrees not to bring any claims against Company if the
            purchaser breaches any of these NFT Terms, including if they make
            commercial use of the related NFT Media.
            <br />
            <br />
            We have the right to remove or refuse to post any of Your Content,
            including NFTs, (a) for any or no reason in our sole discretion; and
            (b) Regardless of the nature of Your Content, we may take any action
            that we deem necessary or appropriate in our sole discretion,
            including if we consider Your Content to violate these NFT Terms,
            violate any intellectual property rights of others, threaten the
            personal safety of Users or the public, or create liability for
            Company or other Users.
            <br />
            <br />
            <br />
            <p>
              <div className={gs.h3}>
                4. Specific Terms for the Premium Platform and Creators
              </div>
              <br />
              It is the Company&apos;s intention to offer a Soundverse platform
              to invited Artists that only allows them to mint songs as an NFT,
              sell NFTs, and showcase those NFTs associated with their original
              song. If a Creator is invited to use the Platform as an Invited
              Creator, the Company may enter into an addendum with the Creator
              (an &quot;Artists appendix&quot;).
              <br />
              <br />
              If there is a conflict between a Creator Addendum and these NFT
              Terms, the provisions of the Artists appendix shall take
              precedence for the such Invited artist. In order to promote the
              artist&apos;s music NFTs, the artist&apos;s NFTs, and the
              Soundverse platform, the Invited artist&apos;s grants Company a
              perpetual, irrevocable, and exclusive license to use, reproduce,
              display, and showcase the artist&apos;s music NFT.
              <br />
              <br />
              The exclusive license granted above means that Invited artists
              cannot use, reproduce, or display any of their music NFTs in
              connection with non-fungible tokens or any other blockchain
              collectible, platform, or service, or grant the right to any third
              party to do so, unless otherwise specified in an Artist Appendix.
              The Invited artists are required to provide Company with
              high-quality audio files and other embodiments of the
              artists&apos; music NFTs in order for Company to exercise its
              rights.
              <br />
              <br />
              Promotion and marketing of the Creators&apos; NFTs shall be solely
              controlled by the company, including selecting certain
              Creators&apos; NFTs to participate in events.
              <br />
              <br />
              Through participation in marketing activities as agreed in a
              Creator Addendum, Invited Creator assists Company in promoting or
              marketing the Creator&apos;s NFTs.
              <br />
              <br />
              As part of promoting the Artist&apos;s NFTs, the Invited music
              Artist hereby grants Company the right to use the name, image,
              photo, biography, signature, and likeness of the Invited Creator
              exclusively for the purpose of marketing and promoting the
              Creator&apos;s NFTs.
              <br />
              <br />
              It is prohibited for any Invited music artists to promote or
              market Company, the NFT Marketplace, or any artist&apos;s NFTs in
              a way that is misleading or deceptive. Whenever Invited Creator is
              promoting any product or service, it is required to clearly and
              conspicuously disclose to the public any connection between
              Invited Creator and Company, including close to any marketing
              statements.
              <br />
              <br />
              If the Invited music artist promotes or markets the artist&apos;s
              music NFTs, the Buyer will not be misled into thinking that such
              NFTs are investment products or can be expected to gain capital
              appreciation or generate profits, or that such NFTs may be
              characterized as securities or regulated investment products in
              any applicable jurisdiction. In exchange for reasonable
              cooperation, the Invited music artist will be required to validate
              the authenticity of the artist’s music NFTs if requested by the
              Company.
              <br />
              <br />
              Upon the sale of the Creator&apos;s NFTs on the Platform, the
              Company will charge the Artist a platform fee of 3,5% (or another
              percentage as specified in the Artist Appendix). Any User
              (including an Invited Creator) using or interacting with the
              Platform is subject to these NFT Terms, in addition to the rest of
              these terms.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>5. Copyright Policy</div>
              <br />
              It is possible for Company to monitor NFTs, NFT Media, and Your
              Content uploaded to the NFT Marketplace for infringement of the
              intellectual property rights of third parties, but it is not
              required to do so.
              <br />
              <br />
              The Company can&apos;t review all such material before it is
              posted, and it can&apos;t remove objectionable material after it
              has been posted. Consequently, Company assumes no responsibility
              for the actions of users or third parties in regard to
              transmissions, communications, and content.
              <br />
              <br />
              In addition to the Soundverse Content, all other trademarks,
              product names, logos, and copyright material on the Platform
              belong to their respective owners and may not be copied, imitated,
              or used without permission. Please contact Soundverse at
              legal@soundverse.io if you find any content on the Platform that
              you believe infringes your copyright.
              <br />
              <br />
              Please include the following information in your written notice if
              you prefer:
              <br />
              <br />
              <ul className="list-disc pl-10">
                <li>
                  The URL of Soundverse content that infringes your or a third
                  party&apos;s copyright found on your site
                </li>
                <li>
                  A physical or electronic signature of a person authorized to
                  act on behalf of the owner of the work(s) that has/have been
                  allegedly infringed;
                </li>
                <li>
                  Identification of works or materials being infringed, or, if
                  multiple works are covered by a single notification, a
                  representative list of such works;
                </li>
                <li>
                  Information reasonably sufficient to permit Anghami to contact
                  you, such as an address, telephone number, and, if available,
                  an electronic mail address at which you may be contacted;
                </li>
                <li>
                  A statement that you have a good faith belief that use of the
                  material relied upon is not authorized by the copyright owner,
                  its agent, or the law;
                </li>
                <li>
                  Your proof of authorization to act on behalf of the owner of
                  the exclusive right that is allegedly infringed;
                </li>
                <li>
                  Your message must be sent to our email at legal@soundverse.io
                </li>
              </ul>
              <br />
              <br />
              Copyright is the only area covered by the process described above.
              Please let us know if you find content that infringes your
              trademark rights by emailing legal@soundverse.io. Please report
              any content that infringes or violates any other right you have,
              that is defamatory, pornographic, obscene, racist, or otherwise
              responsible for the widespread offense to legal@soundverse.io, or
              that violates these Terms or applicable laws, or is blatantly
              forgery, abuse, spam, or otherwise violates any other right you
              have.
              <br />
              <br />
              User accounts that repeatedly violate the rights of others are
              usually disabled or terminated, at our discretion, based on the
              circumstances. If three valid infringement notices are received,
              Soundverse will close the account if there are no aggravating or
              mitigating circumstances. When you materially misrepresent that
              content or activity does not infringe on someone&apos;s copyright,
              you may be liable for damages.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>6. Verification and Payment</div>
              <br />
              If you engage in payments or transactions through the NFT
              Marketplace, or conduct any other payments or transactions through
              the NFT Marketplace, we are not liable for any claims or damages
              that may arise.The NFT Marketplace does not provide refunds for
              any purchases made on or through the NFT Marketplace, regardless
              of whether those purchases are for NFTs or anything else. Since
              all payments are handled by protocols, it is technically
              impossible to provide any refunds or fund management services.
              Regardless of whether or not you use the NFT Marketplace or NFTs,
              you will be solely liable for all taxes, duties, and assessments
              (except taxes on our net income) claimed or imposed by any
              governmental authority related to your use of the NFT Marketplace
              or NFTs, except for income taxes imposed by governmental
              authorities on such purchases.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>7. Assumption of Risks</div>
              <br />
              If you engage in payments or transactions through the NFT
              Marketplace, or conduct any other payments or transactions through
              the NFT Marketplace, we are not liable for any claims or damages
              that may arise.The NFT Marketplace does not provide refunds for
              any purchases made on or through the NFT Marketplace, regardless
              of whether those purchases are for NFTs or anything else. Since
              all payments are handled by protocols, it is technically
              impossible to provide any refunds or fund management services.
              Regardless of whether or not you use the NFT Marketplace or NFTs,
              you will be solely liable for all taxes, duties, and assessments
              (except taxes on our net income) claimed or imposed by any
              governmental authority related to your use of the NFT Marketplace
              or NFTs, except for income taxes imposed by governmental
              authorities on such purchases.
              <br />
              You will be entirely responsible for any purchase, sale, or
              facilitation you make, accept or facilitate outside of the NFT
              Marketplace.In order to make an informed decision to purchase an
              NFT, you acknowledge that you have obtained sufficient
              information, including carefully reviewing the code of the smart
              contract and the NFT, and fully understanding their functions. We
              do not control or endorse NFTs purchased or sold outside of the
              NFT Marketplace.
              <br />
              <br />
              The NFT Marketplace expressly disclaims all liability for any
              losses you may incur when transacting, facilitating transactions
              in, NFTs outside the NFT Marketplace, or facilitating transactions
              in any NFTs outside the NFT Marketplace. Third-party materials may
              be displayed, included, and/or made available in certain sections
              of the NFT Marketplace. The Company does not undertake any
              examination or evaluation of the content, accuracy, completeness,
              availability, timeliness, validity, copyright compliance,
              legality, decency, or quality of Third Party Materials by you or
              your organization by using the NFT Marketplace. Third-party
              materials, products, or services that are provided by third
              parties are not warranted or endorsed by us, nor do we assume and
              will not have any liability or responsibility for them. You
              acknowledge and accept that Soundverse platform is currently at
              the Beta version and constantly we are testing and improving our
              concept.
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>8. Right transfer</div>
              <br />
              All rights and obligations under these Terms may be freely
              assigned, subcontracted, or otherwise transferred by Soundverse.
              It is not permitted for you to assign your rights or obligations
              under these Terms.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>9. Termination</div>
              <br />
              Any time and for any reason, we reserve the right to terminate
              your access or use of the Platform without notice. Such an event
              shall not entail any liability or obligation on our part.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>10. Severability</div>
              <br />
              Consider the following hypothetical situation: any of these Terms
              are invalid, unenforceable, or unenforceable for any reason. Those
              terms, clauses, or provisions shall then be severable from these
              Terms. These Terms will not be affected by this change, nor will
              any other terms, clauses, or provisions be invalidated or
              unenforceable.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>11. Entire Agreement</div>
              <br />
              This agreement represents the entire understanding between
              Soundverse and you concerning your access to and use of the
              Platform and Content and supersedes any previous discussions,
              agreements, or understandings (including previous versions). These
              Terms are intended exclusively for the parties benefit, except as
              otherwise provided herein. Any other person or entity does not
              have a right to benefit from them.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>12. Survival</div>
              <br />
              You agree and understand that all provisions of these Terms shall
              survive the termination or expiration.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>13. Contact Information</div>
              <br />
              If you have any questions, want to leave your feedback, or want to
              learn more information about Soundverse, please drop us an email
              at office@soundverse.io. For any legal matter please drop us an
              email to legal@soundverse.io.
              <br />
              <br />
              General questions or comments about the NFT Marketplace or these
              NFT Terms should be sent to the customer support team at
              office@soundverse.io.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h1}>Artist appendix</div>
              <br />
            </p>
            <p>
              <div className={gs.h3}>
                1. Rules for Creating a Listing on Soundverse
              </div>
              <br />
              Invitation-only. Creating a new listing on Soundverse is only
              available to Artists upon receiving an invitation from Soundverse.
              If you would like to be considered as a future invitee, please
              contact us at office@soundverse.io. You can create a new listing
              on Soundverse only after receiving an invitation from Soundverse.
              <br />
              <br />
              Agreement. It is your sole responsibility to fulfill such
              contracts when you sell Soundverse NFTs to a User via the
              Platform. As between Soundverse, you, and the User, you are solely
              responsible for fulfilling such contracts.
              <br />
              <br />
              Content uploaded to the Platform. <br /> In the event that an
              artist is invited, they can create a profile where they can
              include information about themselves, link to other websites
              (collectively, &quot;Profile Information&quot;); upload their
              Audio Content, along with associated artworks and metadata
              (collectively, the Profile Information, Audio Content, and Artwork
              shall be referred to as the &quot;User Content&quot;) It is
              understood that any Profile Information you post to the Platform
              will be for general informational purposes only and will not be
              considered confidential or proprietary. We maintain the right to
              prohibit, cancel, remove or reassign certain Profile Information
              based on appropriate circumstances, as determined by us in our
              sole discretion.
              <br />
              <br />
              Contributors. The Artist shall obtain, maintain, and pay for any
              rights, permissions, licenses, waivers, and consents necessary to
              the extent these Additional Artist Terms do not grant such rights,
              and until otherwise expressly agreed between the parties in
              writing. Including hosting, reproducing, performing publicly, and
              communicating to the public the User Content created by the
              minting, production, creation, sale, and distribution of
              Soundverse NFTs.
              <br />
              <br />
              No infringement of third-party rights. Any unauthorized use of
              copyright-protected material within User Content, regardless of
              whether it is or becomes unauthorized later, is strictly
              prohibited and may constitute a violation of third-party rights.
              It is illegal to upload User Content that you do not own or
              possess the necessary rights to. You may be subject to termination
              of your access to the Platform and criminal or civil charges if
              you commit any such violation.
              <br />
              <br />
              Restrictions and conditions.When using the Platform, you
              understand and agree that:
              <br />
              <br />
              <ul className="list-disc pl-10">
                <li>
                  All Soundverse NFTs and User Content must comply with these
                  Terms
                </li>
                <li>
                  Soundverse may (to the extent practicable or technically
                  possible) obfuscate or remove any Soundverse NFT or User
                  Content that violates these Terms or Soundverse&apos;s
                  policies;
                </li>
                <li>
                  Soundverse NFTs will not be manipulated or interfered with in
                  any way by you;
                </li>
              </ul>
              <br />
              <br />
              You will not upload any content that (i) infringes any
              intellectual property or other proprietary rights of third
              parties; (ii) you do not have the right to upload under any law or
              contract or fiduciary relationship;
              <br />
              <br />
              <ul className="list-disc pl-10">
                <li>
                  All Soundverse NFTs and User Content must comply with these
                  Terms.
                </li>
                <li>
                  Any Soundverse NFT or User Content that violates any of these
                  Terms or any of Soundverse’s policies may be obfuscated or
                  removed from the Platform by Soundverse (to the extent
                  practicably or technically possible), in its sole discretion;
                </li>
                <li>
                  You will not manipulate the price of Soundverse NFTs in any
                  way or interfere with any listings on the platform;
                </li>
                <li>
                  You will not upload any content that (i) infringes any
                  intellectual property or other proprietary rights of any third
                  party; (ii) you do not have a right to upload under any law or
                  contractual or fiduciary relationships; (iii) A computer virus
                  or another type of computer code, file or program which
                  interrupts, destroys or limits the functionality of any
                  computer software, hardware, or telecommunications equipment;
                  (iv) poses or creates a privacy or security threat; or (v)
                  constitutes unsolicited or unauthorized advertising,
                  promotional materials, commercial activities, and sales, such
                  as junk mail, spam, chain letters, pyramid schemes, contests,
                  sweepstakes, or other forms of solicitation;
                </li>
                <li>
                  Posting false, inaccurate, misleading, deceptive, defamatory,
                  or libelous material is prohibited;
                </li>
                <li>
                  Falsely representing or otherwise misrepresenting your
                  affiliation with anyone or anything is forbidden;
                </li>
                <li>
                  As a result of minting and listing Soundverse NFTs on the
                  Platform, Soundverse makes no representation or guarantee that
                  Artists will achieve any particular outcome.
                </li>
                <li>
                  Neither you nor anyone on your behalf will violate or
                  circumvent any laws, regulations, third-party rights, or our
                  systems, services, policies, or determinations of your account
                  status, including but not limited to the Department of
                  Treasury’s Office of Foreign Assets Control
                  (&quot;OFAC&quot;).
                </li>
                <li>
                  Many of our services are accessible internationally. You are
                  responsible for complying with all local laws and regulations
                  applicable to the sale and purchase of items;
                </li>
                <li>
                  Using robots, spiders, scrapers, data mining tools, data
                  gathering, or extraction tools, or other automated means to
                  access our Services is prohibited;
                </li>
                <li>
                  The Platform or servers or networks connected to it will not
                  be interfered with or disrupted by you, or you will not
                  disobey any requirements, procedures, policies, or regulations
                  of networks connected to the Platform;
                </li>
                <li>
                  If you are under the age of 18, you will not solicit personal
                  information from anyone; You will not advertise or offer any
                  goods or services for business purposes that are not expressly
                  authorized; Providing instructional information about illegal
                  activities, such as concealing economic activity, laundering
                  money, or financing terrorism, or furthering or promoting
                  criminal activity or enterprises is prohibited;
                </li>
                <li>
                  Through any means not intentionally made accessible or
                  provided through the Platform, you will not obtain any
                  materials or information; You will not create user accounts by
                  automated means or under false or fraudulent pretenses; and
                  You will not access or use the Platform to create a product or
                  service that is competitive to ours.
                </li>
              </ul>
              <br />
              <br />
              Reservation of Rights. You may be prohibited from uploading User
              Content or minting Soundverse NFTs at our sole discretion. We are
              not required to monitor User Content, but we may, at our sole
              discretion, remove User Content at any time. For the purpose of
              detecting and preventing fraudulent activity and violation of
              these Terms, the Soundverse may monitor User Content.
              <br />
              <br />
              Smart Contract. Artists are able to use Soundverse&apos;s standard
              Smart Contract for Soundverse NFTs, but they are not allowed to
              edit or adapt it. It is the artist&apos;s responsibility to ensure
              the Soundverse Smart Contract is fit for purpose and that they use
              it at their own risk. Soundverse does not warrant or represent
              that the Smart Contract is error-free, nor does it make any
              warranties or representations regarding suitability.
              <br />
              <br />
              Soundverse NFT particulars. As between Soundverse and you, you are
              responsible for determining various aspects of the prior sale for
              your Soundverse NFTs, including the sale price, several editions,
              descriptions, and other details. Soundverse may provide tools to
              help you determine these details on the Platform.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>2. Grant of Rights for User Content</div>
              <br />
              Perpetual and irrevocable license. You grant Soundverse a
              non-exclusive, royalty-free, paid up, perpetual and irrevocable
              license if you upload User Content to the Platform. The User
              Content may be used, copied, shared, reproduced, or otherwise
              distributed, publicly displayed, publicly performed, and available
              to the public (including digital streaming), from time to time,
              the public will be informed of these developments. You are granted
              a separate license for each piece of User Content you upload and
              each Soundverse NFT you mint.
              <br />
              <br />
              As soon as User Content is minted, it will irrevocably be linked
              to the Soundverse NFT associated with it on the Ethereum
              blockchain. Additionally, Artist acknowledges and accepts the fact
              that each user who purchases a Soundverse NFT on the Platform has
              the right to resell, gift, transfer ownership to third parties, or
              use these songs royalty free even after these Terms are terminated
              or expire.
              <br />
              <br />
              In addition to the rights granted hereunder, Artist acknowledges
              that the Soundverse NFT grant to all users the right to stream,
              playback, and access User Content, as embodied and featured
              therein, for Soundverse and its successors and designees to
              facilitate the same for perpetuity.
              <br />
              <br />
              In accordance with these Terms, Artist retains all rights, titles,
              and interests to all User Content, including all copyrights and
              intellectual property rights embodied in or associated with it,
              subject to the rights and licenses granted by Artist in these
              Terms.
              <br />
              <br />
              Upon uploading User Content to the Platform, Artist acknowledges
              and agrees that it also uploads copies of that content (and
              enables Soundverse to upload copies of such content on
              Artist&apos;s behalf) to a distributed server protocol (or IPFS)
              in addition to uploading copies of that content to
              Soundverse&apos;s owned or controlled servers.
              <br />
              <br />
              This content may be copied multiple times and stored on multiple
              nodes across multiple locations once it is uploaded to IPFS.
              Soundverse will not be responsible for the use or access of such
              content outside of the Platform.
              <br />
              <br />
              User Content uploaded to IPFS is beyond Sound&apos;s control and
              cannot be removed or taken down. Any service that links to IPFS
              User Content does not obligate Soundverse to take action on
              Artist&apos;s behalf.
              <br />
              <br />
              <br />
              Marketing purposes. <br /> Soundverse grants you the right to use
              your name, image, and likeness in the Audio Content (including as
              it may be embodied in the Artwork), as well as the title,
              appearance, and equality of any other performer or artist featured
              in the Audio Content or Artwork, for marketing or promotional
              purposes at this time. To promote the Soundverse NFTs you create,
              you agree that your name, image, likeness, biography, and other
              public information about you, along with any other performer or
              artist included in the Audio Content or Artwork, can be used.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>3. Representations and Warranties</div>
              <br />
              To Soundverse, you hereby represent and warrant that: (i) all of
              your User Content, including its parts, is your original work, or
              you have obtained all rights, licenses, consents, and permissions
              necessary to allow Soundverse to use it at all times, and (where
              applicable) to authorize Soundverse to use it, By uploading
              (including to IPFS), minting, reproducing, storing, transmitting,
              distributing, sharing, publicly displaying, publicly performing,
              making available and otherwise communicating to the public your
              User Content, including all parts thereof, to the Platform, you
              consent to these Terms, including, without limitation, rights to
              mint, reproduce, store, transmit, distribute, share, and share
              your User Content. The Platform and the User Content you post do
              not and will not violate the rights of any third party, including
              intellectual property rights, performer rights, publicity and
              privacy rights, or confidential information rights of third
              parties; In order to publish your User Content on the Platform,
              you must have obtained all necessary consents, permissions, and
              releases from all persons appearing in your User Content (iv) your
              User Content, including any comments that you may post on the
              Platform, is not and will not be unlawful, abusive, libelous,
              defamatory, pornographic or obscene, and will not promote or
              incite violence, terrorism, illegal acts, or hatred on the grounds
              of race, ethnicity, cultural identity, religious belief,
              disability, gender, identity or sexual orientation; (v) Soundverse
              can freely exploit User Content in accordance with these Terms,
              including allowing Users to playback Audio Content, without
              obtaining permission, consent, license or authorization from any
              third party; In addition, NFT collectors and Soundverse platform
              will not be required to pay any royalties, fees, remuneration or
              other payments to any Artists or third parties through its
              exploitation of the User Content; (vi) The User content you submit
              will not cause Soundverse and its subsidiaries, affiliates,
              successors, and assigns any liability, including any liability
              arising from their respective employees, agents, directors,
              officers, or shareholders. Upon discovering that any of your User
              Content breaches any of the previous representations or
              warranties, or infringes on another person&apos;s rights or
              violates any law, rule or regulation, Soundverse reserves the
              right to remove your User Content, suspend or terminate your
              access to the Platform, and pursue all legal remedies.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>4. Fees and Accounting</div>
              <br />
              Fees. <br /> Soundverse agrees to waive its payment for providing
              its services to Artists on a non-precedential, temporary basis. It
              is expressly agreed that Soundverse may modify the Terms from time
              to time by amending Section 1 of the Terms (&apos;Modification to
              these Terms&apos;).
              <br />
              <br />
              Payment. <br />
              Artist acknowledges that the Soundverse NFT Smart Contract used to
              mint the Soundverse NFT is the sole method of determining,
              administering, and paying all costs resulting from direct sales of
              Soundverse NFTs on the Platform and secondary sales of Soundverse
              NFTs outside of the Platform. Through the Smart Contract, Users,
              subsequent purchasers, and marketplaces or exchanges make payments
              directly to the Artist&apos;s Digital Wallet. It is important to
              note that Soundverse does not make any payments to Artists or any
              other parties from the sale proceeds. The Soundverse NFT Smart
              Contract requires that the Artist review and approve the Smart
              Contract used to mint the NFT before it is minted. Payments are
              made automatically based on the cryptocurrency used for the
              purchase.
              <br />
              <br />
              After the Smart Contract has been approved and the Sound Verse NFT
              has been minted, a change to these terms is technologically
              impossible, including (without limitation) royalties/fees for
              secondary sales, number of royalties/fee recipients, percentages
              of royalties/fees to be paid to each recipient, and the address of
              each digital wallet (including the artist).
              <br />
              <br />
              Accounting, invoicing, and administration. In relation to the sale
              of Soundverse NFTs and the collection of fees and receipts from
              Users, purchasers, marketplaces and exchanges through the Smart
              Contract, Artist shall be solely responsible for all accounting,
              invoicing, and reporting requirements imposed by local law, tax
              regulation, or other conditions of competent authorities.
              Contributors and rightsholders will also be paid through the Smart
              Contract.
              <br />
              <br />
              Adequate consideration. As a result of the Smart Contract, the
              Artist acknowledges and agrees that the fees received by the
              Artist, together with Soundverse&apos;s provision of tools and
              functionality on the Platform in relation to the Soundverse NFT,
              represent the entire compensation and consideration under these
              Terms. No further payments, royalties, fees, or other sums shall
              be due to the Artist or any other rightholder in connection with
              the Soundverse NFT or User Content when it is streamed, played
              back, reproduced, or monetized.
              <br />
              <br />
              Contributors and rightsholders. It is the artist&apos;s sole
              responsibility to pay any fees or proceeds due to rightsholders
              and contributors for the User Content or In any case, Soundverse
              shall not be liable for any payment to any rightsholders,
              contributors, or third parties, and Artist at this time
              indemnifies the Soundverse Parties from any claims made by or on
              behalf of such persons, without limiting the indemnification
              provided by Artist in section 12 of the Terms. From time to time,
              you may be able to identify specific Digital Wallet addresses
              through the Platform so that a portion of the sale proceeds can be
              transferred to the Digital Wallet address. Artist may be provided
              with this functionality as an accommodation, provided that Artist
              is solely responsible for ensuring all relevant rightsholders are
              adequately compensated. In addition, the artist acknowledges that
              Soundverse reserves the right to remove or add specific terms or
              restrictions to the fee split feature at its discretion.
              <br />
              <br />
              Withholding. Any fees due to Artist under the Smart Contract may
              be deducted and withheld by Soundverse if it receives any fees
              from the Smart Contract.The artist must remove any such parts and
              withhold according to applicable law in order to eliminate or
              reduce such deductions or withholdings.
              <br />
              <br />
              Taxes. All taxes (including net income, gross receipts, franchise
              and property taxes, and other taxes) that apply to the parties or
              their affiliates in connection with these Terms or the
              transactions contemplated by these Terms are the responsibility of
              each party and their respective affiliates.
              <br />
              <br />
              <br />
            </p>
            <p>
              <div className={gs.h3}>5. General</div>
              <br />
              Relationship between the parties. There is no intention by the
              parties to become employees, agents, joint ventures, or partners
              of Soundverse. As a result of these Terms, no relationship is
              created or established.
              <br />
              <br />
              In accordance with both parties, Artist is not taxable in either
              federal or state taxes and does not qualify for any benefits
              provided by Soundverse, including workers&apos; compensation,
              unemployment benefits, disability benefits, health benefits, and
              retirement benefits.
              <br />
              <br />
              No injunctions. The Artist waives the right to forbid the minting,
              sale, re-selling, exploitation or promotion of the Soundverse NFTs
              if Soundverse breaches any of these Terms; and (ii) agrees that
              its rights and remedies shall be limited to the right to recover
              damages at law if Soundverse breaches any of these Terms.
              <br />
              <br />
            </p>
          </p>
        </main>
      </Layout>
    </div>
  )
}
