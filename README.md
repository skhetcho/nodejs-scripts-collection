## Table of Contents

- [Twilio API Interactions](#twilio-api-interactions)
- [Pinecone Example (Unlimited Memory GPT)](#pinecone-example-unlimited-memory-gpt)
- [Stable Diffusion (Custom Instruction)](#stable-diffusion-custom-instruction)
- [CarQueryAPI Usage](#carqueryapi-usage)
- [RegCheck API Usage](#regcheck-api-usage)
- [Instagram Image Scraper](#instagram-image-scraper)
- [Time Calculation](#time-calculation)
- [Blockchain-related Scripts (Uses: web3.js & @truffle/hdwallet-provider)](#blockchain-related-scripts-uses-web3js--trufflehdwallet-provider)
- [Jira Bearer Generator](#jira-bearer-generator)
- [Monday.com Integration](#mondaycom-integration)
- [RingCentral SMS Integration](#ringcentral-sms-integration)
- [Express Webhook Handler](#express-webhook-handler)
- [Google Sheets Interactions](#google-sheets-interactions)
- [Stripe Scripts](#stripe-scripts)
- [Audio Recognition (using deep-affects)](#audio-recognition-using-deep-affects)
- [Shopmonkey Integrations](#shopmonkey-integrations)
- [Edabit](#edabit)

### Twilio API Interactions

1. twilio_phone_verification_service: Simple script to initiate Twilio Verify.
2. twilio_phone_number_verifier: Simple script to verify the phone number with the otp code sent by **twilio_phone_verification_service**.
3. twilio_sms_receiver: SMS receiver server
4. twilio_unique_phone_number_finder: Find available and unique phone numbers on twilio using patterns and wild cards

### Pinecone Example (Unlimited Memory GPT)

1. pinecone_gpt.js: Unlimited memory, locally hosted for any gpt interpolation
2. pinecode_query.js: Query the vector database hosted on Pinecone
3. pinecode_upsert.js: Insert new context/memory into Pinecone's vector db

### Stable Diffusion (Custom Instruction)

stable_difussion_car_image_generator.js: Generates an images of a supplied car make, model, and year using the Stable Diffusion (Stability) API

### CarQueryAPI Usage

carquery_api/scraper.js: Scraper and organizer of the CarQueryAPI. Scrapes all makes, models, and years available for car makers.

### RegCheck API Usage

vehicle_registration_API_integration.js: An implementation of the RegCheck API which retrieves the VIN number from the license plate. This is by far the most comprehensive database of license plates to vin.

### Instagram Image Scraper

instagram_image_scraper.js: As the name suggests, scrapes instagram images using puppeteer

### Time Calculation

1. unix_time_duration_calculator.js: Simple `duration.miunutes(5)` to unix time converter
2. elapsed_time_calculator.js: Similar to **unix_time_duration_calculator**. This script calculates the elapsed time from when the script was run to a later time. The elapsed time is calculated in years, months, days, hours, minutes, and seconds.

### Blockchain-related Scripts (Uses: web3.js & @truffle/hdwallet-provider)

1. blockchain_time_adjuster.js: BNB chain-based future timestamp (block timestamp) adjuster
2. BNB_price_fetcher.js: Fetches the binance coin price from the bnb smart contract
3. crowdsale_token_purchaser.js: Prepare a transaction to buy tokens from a crowdsale contract.

### Jira Bearer Generator

jira_bearer_generator.js: A simple bearer token generator from the user email and provided api key

### Monday.com Integration

monday_integration.js: A demo script showcasing how to integrate Monday.com API

### RingCentral SMS Integration

ringcentral_sms.js: A simple script showcasing how to send an SMS from a RingCentral phone number (must have a developer app on ringcentral to obtain an APP SECRET and KEY)

### Express Webhook Handler

simple_express_webhook.js: An express server demonstrating how to handle different webhook events received.

### Google Sheets Interactions

simple_google_sheets_node.js: A nodejs script that adds a new row into a specific Google Sheets file

### Stripe Scripts

1. create_coupon.js: Creates a coupon with Stripe
2. expire_session.js: Sets a provided session_id to be expired. Useful to test `checkout.session.expired` events
3. tokenize_card.js: Generates a token for the provided credit/debit card details

### Audio Recognition (using deep-affects)

audio_recognition/recognition.js: A script utilizing deep-affects library for voice sentimental analysis (Emotion detection)

### Edabit

edabit/password_scrambler.js: Generates a secret password (scrambled text algo) based on a given message.
edabit/sudokuValidator.js: Validates a sudoku matrix of numbers

### Shopmonkey Integrations

1. orders_processor.js: Gathers the shopmonkey orders details into a ProcessedOrders.txt file based on a list of POs in orders.txt
2. check_po_number_orders.js: Checks which orders have the PO as "shop1" for example
3. shopmonkey_api_get_customer.js: Returns the customer object based on the phone number
4. shopmonkey_api_get_customer_orders.js: Returns the customer orders through their phone number
5. shopmonkey_book_appointment: Simple implementation of the calendar booking api
6. shopmonkey_get_order_services: Returns the services container within a specified order

