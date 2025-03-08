import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  darkHeaderText: {
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150,
  },
  darkPicker: {
    color: '#fff',
  },
  navigation: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  darkButton: {
    backgroundColor: '#0056b3',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
  },
  weekRangeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  darkText: {
    color: '#fff',
  },
  weekContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  dayWrapper: {
    width: 100,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    marginBottom: 10,
  },
  todayText: {
    color: '#ff6347',
  },
  hour: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  hourText: {
    fontSize: 14,
    color: '#888',
  },
  event: {
    backgroundColor: '#ff6347',
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
  },
  eventText: {
    fontSize: 12,
    color: '#fff',
  },
  dayViewContainer: {
    flex: 1,
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthDayWrapper: {
    width: '14.28%',
    alignItems: 'center',
    marginVertical: 5,
  },
  monthDayContainer: {
    alignItems: 'center',
  },
  monthDayText: {
    fontSize: 14,
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff6347',
    marginTop: 2,
  },
  yearContainer: {
    flex: 1,
  },
  monthWrapper: {
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  darkUserInfo: {
    backgroundColor: '#333',
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    width: '90%',
  },
  darkModalView: {
    backgroundColor: '#333',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
  darkInput: {
    borderColor: '#555',
    color: '#fff',
  },
  currentHourLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'red',
  },
  timePicker: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});

export default styles;
