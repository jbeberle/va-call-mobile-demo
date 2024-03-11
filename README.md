# VA: Health and Benefits Mobile App

This repository hosts the source code for the VA: Health and Benefits mobile app. For more information about the project as a whole, please visit [our documentation site](https://department-of-veterans-affairs.github.io/va-mobile-app/).
## Call Center Demo Changes
This demo allows the user to click on the phone number within a claim details screen, and it will send a message to
the call center with some information about the call.  Then it will bring up the phone app to allow them to physically
place the call.   This will make it quicker for the call center to process the Vet's question.
### Source Code
   The new source code is located in **src/callcenter** with these files and directories:
-  **asset** - Where certain images are located in the case a WebRTC app is used in the future.
-  **communication** - This is the interface for POSTing and GETing data from the REST API on the
backend.   TODO:  A physical address and port are used in the "call" method, and should be changed
to be the same as what is in src/store/api/api.ts.   In fact, this directory can go away and 
replaced with the one in src/store/api once the final changes are made.   However, this is necessary
for the demo.
- **components** - The standard components for Icons and Text
- **screens** - Currently contains only one screen:  CallClaimDetailsScreen.tsx which is brought up when
a vet clicks on the phone number.   This would allow entering additional information which could be sent
to the call center.

Another new file is in **src/screens/BenefitsScreen/ClaimsScreen/ClaimDetailsScreen/ClaimStatus/WhatDoIDoIfDisagreement**:
- **PlaceCall.tsx** -  Contains the rendering of the component to place a call.

Modifications to Existing Files:
-  **src/translations/en/common.json** - New strings displayed on new screens.
-  **src/components/ClickForActionLink.tsx** - New click type for calling a call center.   This allows us to forward the information 
to the call center for logging purposes.

## Quick links

- [Documentation site](https://department-of-veterans-affairs.github.io/va-mobile-app/)
- [Development setup instructions](https://department-of-veterans-affairs.github.io/va-mobile-app/docs/Engineering/FrontEnd/DevSetupInstructions/DevSetupProcess)
- [API docs (Swagger)](https://department-of-veterans-affairs.github.io/va-mobile-app/api/)
- [Component library](https://department-of-veterans-affairs.github.io/va-mobile-app/docs/UX/ComponentsSection/)
- [Team charter](https://department-of-veterans-affairs.github.io/va-mobile-app/docs/About/team-charter#operation/v1/immunizations)

## Background

See the [team folder](https://github.com/department-of-veterans-affairs/va.gov-team/tree/master/products/va-mobile-app) for all the background, discovery, planning, and decisions that preceded application development.

## Organizational Chart - as of June 2023
<img width="477" alt="image" src="https://github.com/department-of-veterans-affairs/va-mobile-app/assets/116006847/4d927da3-058a-47fb-853b-e8d12748ebab">
