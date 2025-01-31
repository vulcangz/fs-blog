import { FaHashtag } from '@react-icons/all-files/fa/FaHashtag';
import { FaHome } from '@react-icons/all-files/fa/FaHome';
import { FcAbout } from '@react-icons/all-files/fc/FcAbout';
import { FcHome } from '@react-icons/all-files/fc/FcHome';
import { FcCamcorderPro } from '@react-icons/all-files/fc/FcCamcorderPro';
import { FcContacts } from '@react-icons/all-files/fc/FcContacts';
import { FcIdea } from '@react-icons/all-files/fc/FcIdea';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { FcFaq } from '@react-icons/all-files/fc/FcFaq';
import { FcPlus } from '@react-icons/all-files/fc/FcPlus';
import { FcShop } from '@react-icons/all-files/fc/FcShop';
import { FcVideoFile } from '@react-icons/all-files/fc/FcVideoFile';
import { FcReading } from '@react-icons/all-files/fc/FcReading';
import { FcVoicePresentation } from '@react-icons/all-files/fc/FcVoicePresentation';
import { FcReadingEbook } from '@react-icons/all-files/fc/FcReadingEbook';

// data left index
export const categories = [
  {
    title: 'Home',
    icon: <FcHome />,
    href: '/'
  },
  {
    title: 'DEV++',
    icon: <FcPlus />,
    href: '/++'
  },
  {
    title: 'Podcasts',
    icon: <FcVoicePresentation />,
    href: '/pod'
  },
  {
    title: 'Videos',
    icon: <FcCamcorderPro />,
    href: '/videos'
  },
  {
    title: 'Tags',
    icon: <FaHashtag />,
    href: '/tags',
    disabled: true
  },
  {
    title: 'DEV Help',
    icon: <FcIdea />,
    href: '/help'
  },
  {
    title: 'Forem Shop',
    icon: <FcShop />,
    href: 'https://shop.forem.com/'
  },
  {
    title: 'Advertise on DEV',
    icon: <FcLike />,
    href: '/advertise'
  },
  {
    title: 'DEV Challenges',
    icon: <FcLike />,
    href: '/challenges'
  },
  {
    title: 'DEV Showcase',
    icon: <FcLike />,
    href: '/showcase'
  },
  {
    title: 'About',
    icon: <FcAbout />,
    href: '/about'
  },
  {
    title: 'Contact',
    icon: <FcContacts />,
    href: '/contact'
  },
  {
    title: 'Guides',
    icon: <FcReadingEbook />,
    href: '/guides'
  }
];

export const memberCategories = [
  {
    title: 'Home',
    icon: <FcHome />,
    href: '/'
  },
  {
    title: 'DEV++',
    icon: <FaHome />,
    href: '/'
  },
  {
    title: 'Reading list',
    icon: <FcReading />,
    href: '/'
  },
  {
    title: 'Videos',
    icon: <FcVideoFile />,
    href: '/'
  },
  {
    title: 'Tags',
    icon: <FaHashtag />,
    href: '/tags',
    disabled: true
  },
  {
    title: 'DEV Help',
    icon: <FaHome />,
    href: '/'
  },
  {
    title: 'FAQ',
    icon: <FcFaq />,
    href: '/faq'
  }
];

export const tags = [
  'javascript',
  'webdev',
  'beginners',
  'programming',
  'react',
  'python',
  'angular',
  'csharp',
  'cplusplus',
  'ruby'
];

// data right index
export const listings = [
  {
    id: 1,
    title: 'Looking for a Linus  content writter',
    event: 'job'
  },
  {
    id: 2,
    title: 'Help Needed for Low-code Framework for Node.js',
    event: 'collabs'
  },
  {
    id: 3,
    title: 'You are font-end developer? This is for you, Sample Data API',
    event: 'collabs'
  },
  {
    id: 4,
    title: 'Help Needed for Low-code Framework for Node.js',
    event: 'collabs'
  },
  {
    id: 5,
    title: 'Help Needed for Low-code Framework for Node.js',
    event: 'collabs'
  }
];

export const helps = [
  {
    id: 1,
    title: 'is there a CMS that produces social networks or communities?',
    numberCmt: 2
  },
  {
    id: 2,
    title: 'Want your blog post to be ready by more? Click here!',
    numberCmt: 0
  },
  {
    id: 3,
    title:
      'hey guys I need help with a presentation I want the best thing to being related to date engineering',
    numberCmt: 0
  },
  {
    id: 4,
    title:
      'In handle bars if there is an attribute that is an array values, how we can group by that if the json is not sorted?',
    numberCmt: 13
  }
];

export const discuss = [
  {
    id: 1,
    title: 'What was your win this week?',
    numberCmt: 14
  },
  {
    id: 2,
    title: 'Open Visual Code from  the Terminal',
    numberCmt: 6
  },
  {
    id: 3,
    title: 'How to do machine learning in Javascript?',
    numberCmt: 0
  },
  {
    id: 4,
    title: 'Share a Screenshot of your Terminal',
    numberCmt: 1
  },
  {
    id: 5,
    title: 'A major de todas as fraquezas o medo de parecer fraco',
    numberCmt: 0
  }
];

export const challenge = [
  {
    id: 1,
    title: 'MAANG - Dream for many people',
    numberCmt: 0
  },
  {
    id: 2,
    title: 'How many AWS Services Can You Nam?',
    numberCmt: 0
  },
  {
    id: 3,
    title: '976.Leetcode solution in python 3',
    numberCmt: 0
  },
  {
    id: 4,
    title: 'Printing Staircase in Javascript',
    numberCmt: 4
  },
  {
    id: 5,
    title: 'Daily Challenge #256 - How many Are Smaller Than I',
    numberCmt: 8
  }
];

export const Share = [
  {
    id: 1,
    text: 'Share to Twitter'
  },
  {
    id: 2,
    text: 'Share to Linkedln'
  },
  {
    id: 3,
    text: 'Share to Reddit'
  },
  {
    id: 4,
    text: 'Share to Hacker News'
  },
  {
    id: 5,
    text: 'Share to Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=#url'
  }
];

export const CodeOfConduct = `
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, caste, color, religion, or sexual
identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the overall
  community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or advances of
  any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email address,
  without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official email address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
[INSERT CONTACT METHOD].
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series of
actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or permanent
ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior, harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the
community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.1, available at
[https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

Community Impact Guidelines were inspired by
[Mozilla's code of conduct enforcement ladder][Mozilla CoC].

For answers to common questions about this code of conduct, see the FAQ at
[https://www.contributor-covenant.org/faq][FAQ]. Translations are available at
[https://www.contributor-covenant.org/translations][translations].

[homepage]: https://www.contributor-covenant.org
[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
[Mozilla CoC]: https://github.com/mozilla/diversity
[FAQ]: https://www.contributor-covenant.org/faq
[translations]: https://www.contributor-covenant.org/translations
`;

export const TermsAndConditions = `
Terms and conditions

DATE OF LAST REVISION: 30 January 2025




Welcome to FS-BLOG!

These terms and conditions outline the rules and regulations for the use of FS-BLOG' Website, located at http://localhost:3000. By accessing this website, you agree to these terms and conditions. Please do not continue to use http://localhost:3000 if you do not agree with all of the terms and conditions stated on this page.

The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of China. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.



Cookies

We employ the use of cookies. By accessing http://localhost:3000, you agree to use cookies in agreement with the FS-BLOG' Terms and Conditions and Privacy Policy.


Most interactive websites use cookies to let us retrieve the user’s details for each visit. In order to provide you with access to the Website and a more personalized and responsive service, we need to remember and store information about how you use this website. This is done using small text files called cookies. Cookies contain small amounts of information and are downloaded to your computer or another device by a server for this Website. Your web browser then sends these cookies back to this website on each subsequent visit so that it can derecognize and remember things like your user preferences (visits, clicks, historical activity). You can find more detailed information about cookies and how they work at http://www.aboutcookies.org.


Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies (necessary cookies).


This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid for subscribed/unsubscribed users. When you submit data through a form such as those found on contact pages or comment forms, cookies may be set to remember your user details for future correspondence (functional cookies).


We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work social media sites such as Facebook, and LinkedIn, will set cookies through our site which may be used to enhance your profile on the respective site, or contribute to the data they hold for various purposes outlined in their respective privacy policies.


We or our service providers also use analytic services to help us understand how effective our content is, what interests our users have, and to improve how this Website works. In addition, we use web beacons or tracking pixels to count visitor numbers and performance cookies to track how many individual users access this Website and how often. Generated by Termzy.io. This information is used for statistical purposes only and it is not our intention to use such information to personally identify any user.


The cookies collected are used to a very limited extent necessary for technical purposes (website functionality) and stored for 1 to 5 years in line with the international NAI standards.


The browsers of most computers, smartphones, and other web-enabled devices are typically set up to accept cookies. If you wish to amend your cookie preferences for this website or any other websites you can do this through your browser settings. Your browser’s ‘help’ function will tell you how to do this. Be aware that disabling cookies will affect the functionality of this website in areas in which cookies are necessary for the functioning of features, and usually results in also disabling certain functionalities and features on this site. Therefore, it is recommended that you do not disable cookies.



License and Intellectual Property Rights

Unless otherwise stated, FS-BLOG, and/or its licensors own the intellectual property rights for all material on http://localhost:3000. This website and its contents are protected by copyright, trademark, and other laws of China, and/or foreign countries. We and our licensors reserve all rights not expressly granted under these Terms of Use.


You may access this website for your own personal use subject to restrictions set in these terms and conditions.


You must not:

Republish material from http://localhost:3000;
Use material from http://localhost:3000 for commercial purposes;
Sell, rent, or sub-license material from http://localhost:3000;
Reproduce, duplicate, modify or copy material from http://localhost:3000;
Redistribute content from http://localhost:3000.

You shall not use the "FS-BLOG" name or the FS-BLOG logo, either alone or in combination with other words or design elements. You may not use any of the foregoing names, marks, or logos in any press release, advertisement, or other promotional or marketing material or media, whether in written, oral, electronic, visual, or any other form, except if expressly permitted in writing by FS-BLOG.


You will comply with all applicable laws in accessing and using this Website.



Your Privacy

You acknowledge that we may use your personal information and data according to our Privacy Policy incorporated herein by this reference. You hereby agree to the terms of our Privacy Policy, including any obligations imposed on you therein.



Reservation of Rights

We reserve the right to request that you remove all links or any particular link to our website. You approve of immediately removing all links to our website upon request. We also reserve the right to amend these terms and conditions at any time. By linking to our website, you agree to be bound to and follow these terms and conditions.



Removal of links from our website

If you find any link on our website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links, but we are not obligated to or so or to respond to you directly.



Disclaimers and Limitations of Liability

We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date. This website (including without limitation any content or other part thereof) contains general information only, and we are not, by means of this website, rendering professional advice or services. Before making any decision or taking any action that might affect your finances or business, you should consult a qualified professional advisor.


This website is provided as is, and we make no express or implied representations or warranties regarding it. Without limiting the foregoing, we do not warrant that this website will be secure, error-free, free from viruses or malicious code, or will meet any particular criteria of performance or quality. We expressly disclaim all implied warranties, including, without limitation, warranties of merchantability, title, fitness for a particular purpose, non-infringement, compatibility, security, and accuracy.


Your use of this website is at your own risk and you assume full responsibility and risk of loss resulting from your usage, including, without limitation, with respect to loss of service or data. We will not be liable for any direct, indirect, special, incidental, consequential, or punitive damages or any other damages whatsoever, whether in an action of contract, statute, tort (including, without limitation, negligence), or otherwise, relating to or arising out of the use of this website, even if we knew, or should have known, of the possibility of such damages.


Certain links on this website may lead to websites, resources, or tools maintained by third parties over whom we have no control. Without limiting any of the foregoing, we make no express or implied representations or warranties whatsoever regarding such websites, resources, and tools, and links to any such websites, resources and tools should not be construed as an endorsement of them or their content by us.


The above disclaimers and limitations of liability shall be applicable not only to us but also to our personnel and subcontractors.


The above disclaimers and limitations of liability are applicable to the fullest extent permitted by law, whether in contract, statute, tort (including, without limitation, negligence), or otherwise.


To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website.


As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
`;
