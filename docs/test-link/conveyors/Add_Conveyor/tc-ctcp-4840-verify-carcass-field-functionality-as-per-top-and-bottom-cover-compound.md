# CTCP-4840 — Verify carcass field functionality as per selection of Top and bottom cover compound

| Field | Value |
|---|---|
| **TC ID** | CTCP-4840 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Verify carcass field functionality as per selection of Top and bottom cover compound |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Preconditions:** User is on Add conveyor details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify add conveyor details page | User should able to navigate |
| 2 | Now add all mandatory fields for conveyor | User should able to add |
| 3 | Navigate to conveyor lite tab and select carcass type field | User should able to navigate and select the carcass Type as ST or TX |
| 4 | Validate carcass type is displayed in bottom graph | Based on user selection, ST or TX should be displayed in bottom graph |
| 5 | Validate Top Reinforcement Breaker field | On click None, Steel and Textile should be displayed in dropdown; based on selection of Steel and Textile, value 'S' and 'T' should also be displayed in graph |
| 6 | Validate Bottom Reinforcement Breaker field | On click None, Steel and Textile should be displayed in dropdown. Based on selection of Steel and Textile, value 'S' and 'T' should also be displayed in graph |
| 7 | Fill other fields data also | User should able to fill all fields data |
| 8 | Validate the listing of the conveyor in conveyor list | Conveyor should be displayed on top of the list |
| 9 | Validate the data displayed in installed belt column | Following data should be displayed: (Belt Construction) (Width) (CarcassType) (Breaking Strength)/(Number of plies) (Top cover thickness)(Top Reinforcement Breaker)/(Bottom cover thickness)(Bottom Reinforcement Breaker) Top cover compound/Bottom cover compound |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
