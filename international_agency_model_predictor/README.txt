================================================================================
                    INCLUHUB PREDICT — MODEL ASSESSMENT SYSTEM
                         Internal Portal | Version 1.0
                      Developed for Incluhub International Agency
================================================================================


--------------------------------------------------------------------------------
WHAT THIS SOFTWARE DOES
--------------------------------------------------------------------------------

IncluhubPredict is an internal tool that takes model photos and measurements
as input and produces a full professional assessment including:

  - Body measurements extracted from photos using computer vision
  - Facial analysis (symmetry, golden ratio, skin clarity, face shape)
  - Scores against EU (Paris/Milan), US (New York), and Asian (Tokyo/Seoul/
    Shanghai) international modeling agency standards
  - Fashion category predictions (Editorial, Runway, Commercial, Fitness,
    Swimwear, Plus-Size, Petite, Asian Commercial)
  - Overall potential verdict: Strong / Moderate / Developing / Not Recommended
  - Strengths and improvement areas per model

You can assess one model at a time or upload hundreds in a single batch ZIP.


--------------------------------------------------------------------------------
SYSTEM REQUIREMENTS
--------------------------------------------------------------------------------

Before running this software, make sure the following are installed
on your Windows machine:

  1. Python 3.10 or 3.11 (recommended: 3.11)
     Download from: https://www.python.org/downloads/
     During installation, check the box "Add Python to PATH"

  2. pip (comes with Python automatically)

  3. A modern web browser (Chrome or Edge recommended)

  4. At least 4 GB of free RAM (MediaPipe CV models run in memory)

  5. At least 2 GB of free disk space (for dependencies and uploads)


--------------------------------------------------------------------------------
FIRST-TIME SETUP (DO THIS ONCE)
--------------------------------------------------------------------------------

Step 1 — Open Command Prompt or PowerShell as normal user

Step 2 — Navigate to the project folder:

    cd C:\Incluhub\international_agency_model_predictor

Step 3 — Install all required Python packages:

    pip install -r requirements.txt

    This will download and install FastAPI, MediaPipe, OpenCV, and all other
    dependencies. It may take 3-5 minutes depending on your internet speed.

Step 4 — Verify installation (optional but recommended):

    python -c "import mediapipe; import cv2; import fastapi; print('All OK')"

    If you see "All OK" you are ready to go.


--------------------------------------------------------------------------------
HOW TO START THE SOFTWARE EVERY TIME
--------------------------------------------------------------------------------

Step 1 — Open Command Prompt or PowerShell

Step 2 — Navigate to the project folder:

    cd C:\Incluhub\international_agency_model_predictor

Step 3 — Start the server:

    python run.py

Step 4 — Open your browser and go to:

    http://localhost:8000

    The dashboard will load. Keep the Command Prompt window open while using
    the software. Do not close it or the server will stop.

Step 5 — To stop the server, go back to Command Prompt and press:

    CTRL + C


--------------------------------------------------------------------------------
HOW TO SUBMIT A SINGLE MODEL
--------------------------------------------------------------------------------

1. Click "New Submission" in the left sidebar

2. STEP 1 — Personal Information
   Fill in the model's details:
   - Full Name (required)
   - Gender: Female or Male (required)
   - Date of Birth (used to calculate age for agency scoring)
   - Nationality
   - Hair Color and Eye Color

3. STEP 2 — Self-Reported Measurements
   The model or you should measure these with a tape measure, no clothing:
   - Height in cm (REQUIRED — this calibrates all photo measurements)
   - Weight in kg
   - Bust or Chest circumference (at fullest point)
   - Waist circumference (at narrowest point)
   - Hips circumference (at fullest point)
   - Inseam (from crotch to floor, barefoot)
   - Neck circumference
   - Shoe Size in EU standard
   - Dress or Suit Size
   - Check the box if the model has breast implants (affects accuracy)

4. STEP 3 — Upload Photos
   Upload the following photos. See photo requirements section below.
   - Full Body Front (REQUIRED)
   - Full Body Side (REQUIRED)
   - Face Front (REQUIRED)
   - Face 3/4 Profile (REQUIRED)
   - Swimwear Front (optional but improves body scoring)
   - Swimwear Side (optional)

5. STEP 4 — Review and Submit
   Check the summary and click "Submit for Analysis"

6. You will be taken to the results page. Processing takes 30 to 90 seconds.
   The page refreshes automatically. Do not close the tab.


--------------------------------------------------------------------------------
PHOTO REQUIREMENTS — READ CAREFULLY
--------------------------------------------------------------------------------

Poor photos produce inaccurate measurements. Follow these standards:

FULL BODY PHOTOS (Front and Side):
  - Portrait orientation (vertical, taller than wide)
  - Model must fill at least 60% of the frame top to bottom
  - Standing straight, feet together or slightly apart
  - Arms slightly away from the body (not pressed against sides)
  - For side view: stand exactly 90 degrees to the camera
  - Plain background preferred (white, grey, or any solid color)
  - No heavy or wide clothing — fitted clothing or swimwear is best
  - Good even lighting, no harsh shadows across the body
  - Minimum resolution: 1000 x 1500 pixels

FACE PHOTOS (Front and Profile):
  - Hair pulled back away from face and ears
  - Neutral expression, mouth closed, no smiling
  - Even lighting — no strong shadows on one side of the face
  - No heavy makeup or face paint
  - For front: camera at eye level, looking directly into lens
  - For profile: 45 degree turn from front (not fully sideways)
  - No sunglasses, hats, or accessories
  - Minimum resolution: 800 x 800 pixels

GENERAL RULES FOR ALL PHOTOS:
  - Accepted formats: JPG, JPEG, PNG, WEBP
  - Maximum file size: 20 MB per photo
  - No filters, heavy editing, or beauty retouching
  - Photo must not be blurry — use a tripod or stable surface
  - Not too dark and not overexposed
  - Only one person in the frame


--------------------------------------------------------------------------------
HOW TO DO A BATCH UPLOAD (Multiple Models at Once)
--------------------------------------------------------------------------------

Use this when you have many models to assess at the same time.
The system can handle hundreds of submissions in one batch.

STEP 1 — Prepare your folder structure

Create a main folder. Inside it, create one subfolder per model named
with the model's name or any unique ID. Each model folder must contain:

  - info.json          (model data — see format below)
  - body_front.jpg     (required)
  - body_side.jpg      (required)
  - face_front.jpg     (required)
  - face_profile.jpg   (required)
  - swimwear_front.jpg (optional)
  - swimwear_side.jpg  (optional)

Example folder structure:

    April_2026_Castings/
    |
    |-- Sofia_Laurent/
    |   |-- info.json
    |   |-- body_front.jpg
    |   |-- body_side.jpg
    |   |-- face_front.jpg
    |   |-- face_profile.jpg
    |
    |-- Marco_Rossi/
    |   |-- info.json
    |   |-- body_front.jpg
    |   |-- body_side.jpg
    |   |-- face_front.jpg
    |   |-- face_profile.jpg
    |
    |-- Yuna_Kim/
        |-- info.json
        |-- body_front.jpg
        ...


STEP 2 — Create the info.json for each model

Each model folder must have an info.json file in this exact format:

    {
      "name": "Sofia Laurent",
      "date_of_birth": "2001-03-15",
      "gender": "female",
      "nationality": "French",
      "height_cm": 176.5,
      "weight_kg": 58.0,
      "bust_cm": 85.0,
      "waist_cm": 62.0,
      "hips_cm": 88.5,
      "inseam_cm": 82.0,
      "neck_cm": 33.5,
      "shoe_size_eu": 39,
      "dress_size": "8",
      "hair_color": "Dark Brown",
      "eye_color": "Green",
      "has_implants": false
    }

MINIMUM REQUIRED fields in info.json:
    "name"       — full name (text)
    "gender"     — must be exactly "female" or "male"
    "height_cm"  — height in centimeters as a number (e.g. 176.5)

All other fields are optional but improve measurement accuracy and scoring.

DATE FORMAT: Always use YYYY-MM-DD (e.g. "2001-03-15" for March 15, 2001)
GENDER: Must be exactly "female" or "male" in lowercase
NUMBERS: Use decimal point not comma (176.5 not 176,5)
BOOLEAN: has_implants must be true or false (no quotes, lowercase)


STEP 3 — ZIP the main folder

Select the entire main folder (e.g. April_2026_Castings) and compress it
to a ZIP file. On Windows: right-click > Send to > Compressed folder.

The ZIP should be structured so that when opened it shows the model folders
directly, not an extra layer of folders inside.


STEP 4 — Upload the batch

1. Click "Batch Upload" in the left sidebar
2. Enter a Batch Name (e.g. "April 2026 Castings")
3. Click "Upload and Process Batch"
4. A progress bar will appear showing how many models have been processed
5. Processing speed: approximately 30-90 seconds per model
   For 100 models expect roughly 60-90 minutes total


STEP 5 — View results

Once the batch is complete, go to the Dashboard. All models from the batch
will appear in the Recent Submissions table. Click "View" next to any model
to see their full assessment report.


--------------------------------------------------------------------------------
UNDERSTANDING THE RESULT PAGE
--------------------------------------------------------------------------------

OVERALL SCORE (ring on top right):
  A combined score out of 100 based on market scores and facial analysis.
  This is a general indicator, not the primary metric.

POTENTIAL VERDICT:
  Strong          — Meets or exceeds standards in at least one major market
  Moderate        — Close to standards, specific market may be a good fit
  Developing      — Does not yet meet standards but shows potential
  Not Recommended — Significantly below thresholds across all markets

MARKET SCORES (EU / US / Asia):
  Each scored 0-100 against that market's specific agency standards.
  Score breakdown shows how each measurement component contributed.
  Score colors: Green = 75+, Yellow = 55-74, Red = below 55

MEASUREMENTS TABLE:
  Final measurements are a combination of self-reported tape measure values
  and photo-extracted estimates. Self-reported values take priority.
  A yellow ! badge next to a measurement means the self-reported value and
  photo estimate differ by more than 7cm — verify with a fresh tape measure.

BODY PROPORTIONS:
  Shoulder/Hip ratio     — body shape indicator
  Waist/Hip ratio (WHR) — key hourglass proportion
  Leg/Height ratio      — runway proportion score
  Torso/Height ratio    — styling suitability

FACIAL ANALYSIS:
  Symmetry Score        — left/right facial balance (higher is better)
  Golden Ratio Score    — how closely face proportions match phi (1.618)
  Skin Clarity          — texture and smoothness from photo analysis
  Cheekbone Prominence  — bone structure strength

FASHION CATEGORIES:
  Ranked list of fashion categories the model is best suited for.
  Each shows a score and fit label (Excellent / Good / Moderate / Possible).
  The first category is the primary recommendation.

STRENGTHS and AREAS TO REVIEW:
  Auto-generated plain text observations based on measurement scoring.
  Use these as starting points for your own professional assessment.


--------------------------------------------------------------------------------
DATA STORAGE
--------------------------------------------------------------------------------

All data is stored locally on your machine. Nothing is sent to the internet.

  Database:  C:\Incluhub\international_agency_model_predictor\data\predictor.db
  Photos:    C:\Incluhub\international_agency_model_predictor\uploads\

The database is a SQLite file. You can open it with DB Browser for SQLite
(free download) if you need to inspect or export raw data.

To back up all data, copy the entire "data" and "uploads" folders to a
safe location.


--------------------------------------------------------------------------------
TROUBLESHOOTING
--------------------------------------------------------------------------------

PROBLEM: Server does not start / "Module not found" error
SOLUTION: Run the setup again: pip install -r requirements.txt
          Make sure you are in the correct folder before running python run.py

PROBLEM: "No pose detected" on body photo
SOLUTION: The model is not visible enough in the frame. Ensure full body
          is in shot, background has good contrast, and lighting is even.
          Avoid very loose or baggy clothing that hides body shape.

PROBLEM: "No face detected" on face photo
SOLUTION: Ensure face is front-facing, well lit, and not too small in frame.
          Remove sunglasses, hats, or anything covering the face.

PROBLEM: Processing stuck on "processing" for more than 5 minutes
SOLUTION: Go back to the submission result page and click "Reprocess".
          Check the Command Prompt window for any error messages.

PROBLEM: Measurements seem very inaccurate
SOLUTION: Check photo quality — blur and dark photos reduce accuracy.
          Make sure height was entered correctly (this calibrates everything).
          Providing self-reported tape measure values in Step 2 improves
          final measurement accuracy significantly.

PROBLEM: Browser shows "Connection Refused"
SOLUTION: The server is not running. Open Command Prompt, navigate to the
          project folder, and run: python run.py

PROBLEM: Port 8000 already in use
SOLUTION: Open run.py in any text editor and change port=8000 to port=8001
          Then go to http://localhost:8001 in your browser.


--------------------------------------------------------------------------------
QUICK REFERENCE — AGENCY STANDARDS SUMMARY
--------------------------------------------------------------------------------

FEMALE STANDARDS:

                   EU (Paris/Milan)    US (New York)    Asia (Tokyo/Seoul)
  Height:          175 - 180 cm        173 - 180 cm     168 - 175 cm
  Bust:            83 - 86 cm          86 - 89 cm       81 - 86 cm
  Waist:           59 - 62 cm          61 - 64 cm       58 - 62 cm
  Hips:            86 - 89 cm          86 - 91 cm       84 - 89 cm
  Age (preferred): 16 - 26             16 - 28          16 - 26

MALE STANDARDS:

                   EU (Paris/Milan)    US (New York)    Asia (Tokyo/Seoul)
  Height:          183 - 188 cm        180 - 188 cm     178 - 185 cm
  Chest:           97 - 100 cm         97 - 102 cm      94 - 99 cm
  Waist:           76 - 80 cm          76 - 81 cm       74 - 78 cm
  Age (preferred): 18 - 28             18 - 30          18 - 28

Note: Models outside these ranges can still score well in Commercial,
Fitness, Plus-Size, Petite, or other fashion categories.


--------------------------------------------------------------------------------
CONTACT & SUPPORT
--------------------------------------------------------------------------------

This software was built exclusively for Incluhub International Agency.
For technical issues or feature requests contact the development team.

Email: contact@inclumodels.com

================================================================================
                         END OF DOCUMENTATION
================================================================================
