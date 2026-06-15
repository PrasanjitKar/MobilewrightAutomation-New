Feature: Web Sanity — Production Smoke Check
  As a QA engineer
  I want to verify all major application modules work correctly on PRD
  So that deployments can be validated quickly and confidently

  # ─────────────────────────────────────────────────────────────────────
  # BACKGROUND — Authentication
  # All sanity scenarios run as an authenticated admin user on PRD.
  # Session is pre-loaded via @authenticated tag.
  # ─────────────────────────────────────────────────────────────────────

  Background:
    Given User is at Login page
    And Login with "td.username" and "td.password.admin"

  # ═════════════════════════════════════════════════════════════════════
  # USERS MODULE
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-001  Create Continental user (Market Manager + APAC)
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_user_continental @sanity
  Scenario: Create Continental Market Manager user with APAC assignment
    Given User is on the Users module
    When User creates a Continental user with Market Manager profile and APAC market assignment
    And User sets all required permissions and clicks Create
    Then The new user appears in the Users list with correct assignments and permissions

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-002  Add Distributor User with shop assignment
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_user_distributor @sanity
  Scenario: Add Distributor User with shop assignment
    Given User is on the Users module
    When User creates a Distributor User assigned to "td.distributorShop"
    And User sets permissions and clicks Create
    Then The new user appears in the Users list with Distributor User profile

  # ═════════════════════════════════════════════════════════════════════
  # COMPANY MODULE
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-003  Add Customer Corporate
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_company_customer_corp @sanity
  Scenario: Add Customer Corporate with inspection template
    Given User is on the Company module
    When User creates a Customer Corporate with name "td.companyName" and an inspection template
    Then The new Customer Corporate appears in the Corporate List

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-004  Edit corporate details — upload logo + edit site name
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_company_edit @sanity
  Scenario: Edit corporate details — upload logo and edit site name
    Given An existing Corporate "td.corporateName" and Customer Site exist
    When User uploads a logo on the Corporate edit form
    And User edits the Customer Site name to "td.updatedSiteName"
    Then Corporate logo and updated site name are saved and visible

  # ═════════════════════════════════════════════════════════════════════
  # SITES MODULE
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-005  Delete site from Sites listing screen
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_site_delete @sanity
  Scenario: Delete site from Sites listing screen
    Given User is on the Sites list
    When User selects the site "td.siteName" and clicks Delete
    And User confirms the deletion
    Then The site "td.siteName" is removed from the Sites list

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-006  Delete Distributor Shop from Corporate Detail
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_company_delete_shop @sanity
  Scenario: Delete Distributor Shop from Corporate Detail screen
    Given User is on the Distributor Corporate Detail page for "td.corporateName"
    When User deletes the Distributor Shop "td.shopName" with confirmation
    Then The shop is removed from the sub-entity list and KPI count decrements

  # ═════════════════════════════════════════════════════════════════════
  # CONVEYOR MODULE
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-007  Add conveyor to Customer Site
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_conveyor_create @sanity
  Scenario: Add new conveyor to Customer Site via 12-step wizard
    Given User is on the Conveyor module
    When User clicks Add and completes the wizard with name "td.conveyorName" linked to "td.siteName"
    Then The new conveyor "td.conveyorName" appears in the Conveyor List

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-008  Edit conveyor
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_conveyor_edit @sanity
  Scenario: Edit conveyor name and verify update success
    Given User is on the Conveyor module
    When User edits the conveyor "td.conveyorName" changing the name to "td.updatedConveyorName"
    Then Success toast is shown and "td.updatedConveyorName" appears in the Conveyor List

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-009  Delete conveyor
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_conveyor_delete @sanity
  Scenario: Delete conveyor with confirmation dialog
    Given User is on the Conveyor module with a disposable conveyor "td.conveyorToDelete"
    When User deletes the conveyor "td.conveyorToDelete" with confirmation
    Then The conveyor is removed from the Conveyor List

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-010  Conveyor Bulk Import
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_conveyor_bulk_import @sanity
  Scenario: Conveyor Bulk Import from valid template
    Given User is on the Conveyor Bulk Import page
    When User uploads the valid conveyor template file "td.bulkImportFile" and completes the import
    Then Imported conveyors appear in the Conveyor List

  # ═════════════════════════════════════════════════════════════════════
  # INSPECTIONS MODULE
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-011  Add inspection event with 2 items
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_inspection_create @sanity
  Scenario: Add inspection event with Critical and Good condition items
    Given User is on the Inspections module
    When User creates an inspection "td.inspectionName" with a Critical condition item and a Good condition item
    Then The inspection "td.inspectionName" and both items are visible in the Inspections list

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-012  Edit inspection event + item + download PDF
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_inspection_edit @sanity
  Scenario: Edit inspection event and item, verify PDF download
    Given An inspection "td.inspectionName" exists with items
    When User edits the inspection name and an item condition
    And User saves the changes
    Then The inspection is updated successfully
    And The PDF report is downloadable from the Inspection Details page

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-013  Delete inspection
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_inspection_delete @sanity
  Scenario: Delete inspection event from Inspections list
    Given A test inspection "td.inspectionName" exists in the Inspections list
    When User deletes the inspection with confirmation
    Then The inspection is removed from the Inspections list

  # ═════════════════════════════════════════════════════════════════════
  # COVER WEAR & CONVEYOR INSPECTION
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-014  Cover Wear functionality
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_cover_wear @sanity
  Scenario: Add Cover Wear measurement on a conveyor
    Given User is on the Conveyor Detail page for "td.conveyorName"
    When User navigates to the Cover Wear tab and adds a new measurement
    Then The measurement is saved and visible in the Cover Wear list

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-015  Conveyor Inspection: create, images, pipeline, PDF, delete
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_conveyor_inspection @sanity
  Scenario: Conveyor Inspection full flow — create, upload images, pipeline, download, delete
    Given User is on the Conveyor Inspection module
    When User creates a CI event for "td.conveyorName"
    And User uploads a LHS image and a RHS image
    And The AI pipeline processes the images successfully
    Then The PDF report is downloadable from the CI event
    And User deletes the CI event successfully

  # ═════════════════════════════════════════════════════════════════════
  # FREE TOOLS & BELT INFO
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-016  Free Tools calculate
  # ─────────────────────────────────────────────────────────────────────

  @sanity
  Scenario: Free Tools calculate functionality returns results without errors
    Given User navigates to the Free Tools section
    When User selects a free tool and enters valid input values
    And User clicks Calculate
    Then Calculation results are displayed without errors

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-017  Belt Info — Textile
  # ─────────────────────────────────────────────────────────────────────

  @sanity
  Scenario: Belt Info Textile — calculate, download PDF, clear form
    Given User is on the Belt Info Textile page
    When User enters valid belt specifications and clicks Calculate
    Then Results are displayed
    When User downloads the PDF report
    Then PDF is downloaded successfully
    When User clicks Clear
    Then All fields are reset to defaults

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-018  Belt Info — Steel
  # ─────────────────────────────────────────────────────────────────────

  @sanity
  Scenario: Belt Info Steel — calculate, download PDF, clear form
    Given User is on the Belt Info Steel page
    When User enters valid steel belt specifications and clicks Calculate
    Then Results are displayed
    When User downloads the PDF report
    Then PDF is downloaded successfully
    When User clicks Clear
    Then All fields are reset to defaults

  # ═════════════════════════════════════════════════════════════════════
  # FABRIC SPLICE & STEEL CORD
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-019  Fabric Splice Design full flow
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_fabric_splice @sanity
  Scenario: Fabric Splice Design — add, calculate, save draft, approve, download PDF, delete
    Given User is on the Fabric Splice module
    When User creates a new splice design with required fields
    And User clicks Calculate and views the preview
    And User saves as draft
    And User edits the design and recalculates
    And User submits for approval and the approver approves
    And User downloads the PDF report
    Then The PDF is downloaded successfully
    When User deletes the design
    Then The design is removed from the Fabric Splice list

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-020  Steel Cord Design full flow
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_steel_cord @sanity
  Scenario: Steel Cord Design — add, calculate, save draft, approve, download PDF, delete
    Given User is on the Steel Cord module
    When User creates a new steel cord design with required fields
    And User clicks Calculate and views the preview with Vulcanization Chart
    And User saves as draft then edits and recalculates
    And User submits for approval and the approver approves
    And User downloads the PDF report
    Then The PDF is downloaded successfully
    When User deletes the design
    Then The design is removed from the Steel Cord list

  # ═════════════════════════════════════════════════════════════════════
  # FILE MANAGER
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-021  File Manager functionality
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_file_manager @sanity
  Scenario: File Manager — create folder, upload files, move, view, delete
    Given User is in the Site Detail File Manager for "td.siteName"
    When User creates a folder and uploads an image and a PDF document
    And User moves the image into the folder
    And User previews the image file
    Then The auto-generated folder is visible
    When User deletes the folder and all files
    Then The folder and files are removed from File Manager

  # ═════════════════════════════════════════════════════════════════════
  # MONITORING DEVICE, CORD PROTECT, BELT SCANS
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-022  Monitoring Device CRUD
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_monitoring_device @sanity
  Scenario: Monitoring Device — add via 2-step wizard, edit, delete
    Given User is on the Monitoring Devices module
    When User adds a new Monitoring Device with name "td.deviceName" for "td.conveyorName"
    Then The device "td.deviceName" appears in the Monitoring Devices list with "Successfully created"
    When User edits the device name to "td.updatedDeviceName" and saves
    Then "Successfully updated" toast is shown and device name is updated
    When User deletes "td.updatedDeviceName" with confirmation
    Then The device is removed from the Monitoring Devices list

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-023  Cord Protect main page
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_cord_protect @sanity
  Scenario: Cord Protect main page accessible from Monitoring Device list
    Given A Cord Protect device "td.deviceName" exists in the Monitoring Devices list
    When User opens the Cord Protect view for "td.deviceName"
    Then Cord Protect main page renders with belt visualization and key metrics

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-024  Belt Scan (Cord Inspect) full flow
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_belt_scan @sanity
  Scenario: Belt Scan — add with analysis file, edit, delete, verify Cord Inspect page
    Given User is on the Belt Scans module
    When User creates a belt scan for "td.conveyorName" with Reason for Scan "td.reasonForScan"
    And User uploads a valid analysis file for the belt scan
    And User edits the belt scan details
    Then The belt scan is updated successfully
    When User deletes the belt scan with confirmation
    Then The belt scan is removed from the Belt Scans list
    And The Cord Inspect main page is accessible for a remaining device

  # ═════════════════════════════════════════════════════════════════════
  # MINUTEMAN MODULE
  # ═════════════════════════════════════════════════════════════════════

  # ─────────────────────────────────────────────────────────────────────
  # TC-SANITY-025  Minuteman conveyor calculation
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sanitydata.csv @Key:sanity_minuteman @sanity
  Scenario: Minuteman conveyor calculation — Legacy Cypher Metric, PDF, edit, delete
    Given User is on the Minuteman module
    When User adds a Conveyor calculation named "td.calcName" using Legacy Cypher Metric program
    And User completes all 12 wizard steps with valid data
    And User downloads the Final Report PDF
    And User clicks Create
    Then The calculation "td.calcName" appears in the Minuteman list with success toast
    When User edits the calculation "td.calcName" and updates a field
    Then "MINUTEMAN.MINUTEMAN_UPDATE" success toast is shown
    When User deletes the calculation "td.calcName" with confirmation
    Then The calculation is removed from the Minuteman list
