# Course: WAX Blockchain Game Front-End with React, Redux & Saga Part 1

**Total Course Time: 1:28:11**

## Section 1: Reviewing the tools we will use on this course
**Total Time: 03:10**
- **Lecture 1**: Understanding the stack we will use, **Time: 03:10**

## Section 2: Creating a React project and setting up Chakra UI
**Total Time: 09:15**
- **Lecture 2**: Create a react app, **Time: 02:06**
- **Lecture 3**: Installing and configuring chakra ui, **Time: 03:49**
- **Lecture 4**: Creating a Navigation bar, **Time: 03:20**

## Section 3: Installing Redux and creating our first Slice
**Total Time: 12:30**
- **Lecture 5**: Adding Redux toolkit and configuring it, **Time: 03:22**
- **Lecture 6**: Creating a slice for authentication, **Time: 04:28**
- **Lecture 7**: Using the new state in the NavBar, **Time: 04:40**

## Section 4: Adding debugging tools to our project
**Total Time: 03:58**
- **Lecture 8**: Adding tools to help debugging React and Redux, **Time: 03:58**

## Section 5: Installing and creating our first Saga
**Total Time: 13:52**
- **Lecture 9**: Installing Redux Saga and configuring it, **Time: 03:18**
- **Lecture 10**: Creating our Sagas and updating our reducers, **Time: 08:05**
- **Lecture 11**: Update the NavBar to use the new actions, **Time: 02:29**

## Section 6: Installing and configuring WharfKit to connect to WAX
**Total Time: 15:25**
- **Lecture 12**: Installing ans setting up WharfKit, **Time: 06:53**
- **Lecture 13**: Updating the authSlice with the new reducers, **Time: 02:51**
- **Lecture 14**: Updating our saga to use the new reducers, **Time: 03:12**
- **Lecture 15**: Adding the wallet name in the NavBar, **Time: 02:29**

## Section 7: Restoring WAX sessions
**Total Time: 10:02**
- **Lecture 16**: Restoring existent sessions, **Time: 05:38**
- **Lecture 17**: Creating a Session Initializer component, **Time: 02:54**
- **Lecture 18**: Fixing the restore session state, **Time: 01:30**

## Section 8: Fetching the user wallet tokens from the WAX blockchain
**Total Time: 19:59**
- **Lecture 19**: Creating a State, Reducer and Actions for the tokens, **Time: 06:23**
- **Lecture 20**: Request the token values from the WAX blockchain, **Time: 06:08**
- **Lecture 21**: Creating a Saga to fetch our tokens, **Time: 05:21**
- **Lecture 22**: Registering our sagas with a rootSaga and fixing small mistakes, **Time: 02:07**

--- 

# Course: WAX Blockchain Game Front-End with React, Redux & Saga Part 2

**Total Course Time: 1:44:10**

## Section 1: Fetching the user tokens values from his wallet
**Total Time: 16:40**
- **Lecture 1**: Fetching the tokens on user login or session restored, **Time: 02:49**
- **Lecture 2**: Understand why the WAX service is not returning the tokens values, **Time: 02:17**
- **Lecture 3**: Getting the correct values for the tokens into our storage, **Time: 04:21**
- **Lecture 4**: Creating the token component, **Time: 04:14**
- **Lecture 5**: Adding spinners and error messages on the token balance component, **Time: 02:59**

## Section 2: Fetching the user details in the game
**Total Time: 35:12**
- **Lecture 6**: Create a new service to request the user details from the WAX blockchain, **Time: 04:17**
- **Lecture 7**: Create a new slice for the user details, **Time: 04:51**
- **Lecture 8**: Creating a saga for the user details, **Time: 04:13**
- **Lecture 9**: Adding the slice and the reducer to our store, **Time: 03:30**
- **Lecture 10**: Parse the WAX response to add the values to the store, **Time: 06:59**
- **Lecture 11**: Fix max energy value not loading, **Time: 00:48**
- **Lecture 12**: Showing the user details in a new component, **Time: 05:52**
- **Lecture 13**: Creating the energy bar component, **Time: 04:42**

## Section 3: Fetching the static tools data from the WAX smart contract
**Total Time: 24:38**
- **Lecture 14**: Fetching the tools data from the WAX smart contract, **Time: 07:47**
- **Lecture 15**: Create a new slice for the tools details, **Time: 04:12**
- **Lecture 16**: Create a new saga for the tools details, **Time: 04:48**
- **Lecture 17**: Create a new component to initialize the tools, **Time: 05:26**
- **Lecture 18**: Small fixes to query the tools details, **Time: 02:25**

## Section 4: Showing staked NFTs from the user in a carousel
**Total Time: 23:40**
- **Lecture 19**: Creating a new service to request the user staked NFTs, **Time: 08:03**
- **Lecture 20**: Creating our slice for the user tools staked on the smart contract, **Time: 04:41**
- **Lecture 21**: Creating a saga to fetch the user tools, **Time: 06:36**
- **Lecture 22**: Fixing the WAX request, **Time: 02:03**
- **Lecture 23**: Fixing the hash values coming from our smart contract table, **Time: 02:17**

---

# Course: WAX Blockchain Game Front-End with React, Redux & Saga Part 3

**Total Course Time: 1:41:53**

## Section 1: Carousel to show player staked NFTs
**Total Time: 28:50**
- **Lecture 1**: Creating a ToolCard component to display the NFTs, **Time: 09:05**
- **Lecture 2**: Import the carousel library and start create our component, **Time: 02:13**
- **Lecture 3**: Importing state and trying to loop over our tools, **Time: 04:28**
- **Lecture 4**: Protecting our component from try to render while the data is loading, **Time: 03:36**
- **Lecture 5**: Display the NFTs in the carousel, **Time: 04:29**
- **Lecture 6**: Configuring the carousel to display the NFTs correctly, **Time: 04:59**

## Section 2: Display NFT details and actions
**Total Time: 1:03:49**
- **Lecture 7**: Displaying the NFT durability, **Time: 07:40**
- **Lecture 8**: Add a claim and a fix button for the tool, **Time: 06:29**
- **Lecture 9**: Parsing the values of gold and energy the user has, **Time: 05:45**
- **Lecture 10**: Disable the claim button when we not able to claim a tool, **Time: 05:58**
- **Lecture 11**: Disable the fix button when we not able to fix a tool, **Time: 03:13**
- **Lecture 12**: Dispatching the claim action from our component, **Time: 04:08**
- **Lecture 13**: Creating a new action for NFT actions, **Time: 09:46**
- **Lecture 14**: Creating a saga to claim the NFT, **Time: 06:43**
- **Lecture 15**: Create the WAX service to send the claimnft action, **Time: 07:44**
- **Lecture 16**: Integrate the claimNft action to our saga, **Time: 06:43**

## Section 3: Small improvements on the game UI/UX
**Total Time: 09:14**
- **Lecture 17**: Fixing the date time problem with the claim button, **Time: 05:03**
- **Lecture 18**: Reloading user and tools data after claiming the tool, **Time: 04:11**

---