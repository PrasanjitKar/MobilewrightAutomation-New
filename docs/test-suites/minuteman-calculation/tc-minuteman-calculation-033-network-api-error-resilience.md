# TC-MINUTEMAN-033: Network API Error Handling & Logging

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`catch (e)`)

---

## 🎯 Objective
Verify that when network API requests fail (e.g., 500 server error, timeout, socket exception), `MinutemanListBloc` logs the error to Firebase Analytics (`ApiKeys.apiError`) and `LoggingService`, gracefully falls back to Hive cache, and emits `ListStatus.offline` without crashing.

---

## 📋 Preconditions
- User is logged into the mobile application.

---

## 🧪 Test Steps
1. Simulate a backend API failure (e.g., HTTP 500 or mock exception on `ctp.minutemanManager.get()`).
2. Navigate to the Minuteman calculation list screen.
3. Observe BLoC event handling in `_mapMinutemanListLoadEventToState`:
   - Exception is caught in `on Exception catch (e)`.
   - Firebase Analytics logs `name: ApiKeys.apiError, parameters: {description: 'Minuteman list'}`.
   - `loggingService.logError(e.toString())` is called.
   - BLoC emits `state.copyWith(status: ListStatus.offline, minutemanFullList: cache)`.
4. Verify the screen displays the cached list without an unhandled crash or white screen.

---

## 🔍 Expected Results
- Application degrades gracefully to local cached state during network API failures.
- Errors are tracked in analytics and internal logging.

---

## 📱 Flutter Source Reference
- **BLoC Error Handler**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`on Exception catch (e)`)
- **Analytics Key**: `ApiKeys.apiError`
- **Logging**: `LoggingService.logError`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_api_error_fallback @regression @both
Scenario: Handle network API errors gracefully with cache fallback
  Given the backend server returns an error for Minuteman API
  When the user opens the Minuteman calculation list
  Then the error should be logged to analytics
  And the calculation list should fallback to cached records
  And the application should remain stable without crashing
```
