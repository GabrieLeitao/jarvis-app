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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  darkPickerContainer: {
    borderColor: '#555',
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
    alignSelf: 'flex-end',
    width: '10%',
    alignItems: 'center',
  },
  weekRangeText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 15,
  },
  darkText: {
    color: '#fff',
  },
  weekContainer: {
    marginBottom: 0,
    flexDirection: 'row',
    width: '100%',
  },
  hourColumn: {
    width: 50,
  },
  dayWrapper: {
    flex: 1,
  },
  dayContainer: {
    alignItems: 'center',
    width: '100%',
  },
  dayText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
  },
  todayText: {
    color: '#ff6347',
  },
  hour: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  hourText: {
    fontSize: 14,
    color: '#888',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  hourLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    position: 'absolute',
    left: 50, // Align with hour column
    right: 0,
    top: '50%',
  },
  event: {
    position: 'absolute',
    left: 0,
    right: 0,
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
  dayEventsContainer: {
    position: 'relative',
    flex: 1,
    width: '100%',
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
    width: '30%',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  darkUserInfo: {
    backgroundColor: '#333',
  },
  userInfoText: {
    fontSize: 14,
    marginBottom: 5,
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
    left: 50, // Align with hour column
    right: 0,
    height: 2,
    backgroundColor: 'red',
    zIndex: 1,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  verticalLine: {
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  clockContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  darkClockContainer: {
    backgroundColor: '#333',
  },
  clockText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkClockText: {
    color: '#fff',
  },
  navButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  darkNavButton: {
    backgroundColor: '#0056b3',
  },
  viewButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  darkViewButton: {
    backgroundColor: '#0056b3',
  },
  viewButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  optionsModal: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    zIndex: 2,
  },
  darkOptionsModal: {
    backgroundColor: '#333',
  },
  optionsModalView: {
    flex: 1,
    padding: 20,
  },
  darkOptionsModalView: {
    backgroundColor: '#333',
  },
});

export default styles;
