import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux'
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from 'react-native';
import { Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {sumarPeriodo} from '../../redux/actions/transactions'
import s from './styles';


const Statistics = () => {
  const dispatch = useDispatch()
  const transactionSum = useSelector((state) => state.transactions.sumatoria);
  const user = useSelector((state) => state.userReducer);

  //console.log('ESTOY EN LAS ESTADISTICAS ', transactionHistory)

  const [initialDate, setInitialDate] = useState(new Date(1598051730000));
  const [limitDate, setLimitDate] = useState(new Date(1598051730000));
  const [showInitial, setShowInitial] = useState(false);
  const [showLimit, setShowLimit] = useState(false);

  const [filteredTransactions, setFilteredTransactions] = useState({
    labels: [],
    data: []
  });
  
  const [type, setSendData] = useState("") 
  
  useEffect(() => {
   dispatch(sumarPeriodo({id:user.id,dias:30,periodo:1}))
  }, []) 
  console.log("NUEVO FILTROOOOO ", transactionSum.montos ) 
  const handlerType = (type) => {
    setSendData(type);
  };
  let dataConstructor = {
    
    labels: transactionSum.fechas ? transactionSum.fechas:[],
    datasets: [
      {
        data: transactionSum.montos ? transactionSum.montos : [],
        color: (opacity = 1) => `rgba(75, 129, 231, ${opacity})`,
        strokeWidth: 2,
      }
    ],
  };


  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(72, 129, 231, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(72, 129, 131 , ${opacity})`,
    strokeWidth: 2,
    barPercentage: 1.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#4b81e7"
    },
    style: {
      borderRadius: 16,
      fontFamily: 'RedHatText_Regular',
    },
  };


  return (
    <View>
      <Text style={s.header}>Estadisticas</Text>
      <View>
        <ScrollView horizontal={true}>
          < BarChart
          yAxisLabel="$"
          segments={4}
          fromZero={true}
            data={dataConstructor}
            width={480}
            height={360}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>
      <View style={s.optionsContainer}>
        {/* <View style={s.optionTypeContainer}>
          <Button style={s.button} onPress={() => handlerType('positivo')}>
            <Text style={s.textButton}>Ingresos</Text>
          </Button>
          <Button style={s.button} onPress={() => handlerType('negativo')}>
            <Text style={s.textButton}>Gastos</Text>
          </Button>
        </View> */}
        <View style={s.optionTimeContainer}>
          <Button style={s.timeButton} onPress={() =>{

            dispatch(sumarPeriodo({id:user.id,dias:30,type:type,periodo:1}))
            setSendData("")
          } }>
            <Text style={s.textButton}>Diario</Text>
          </Button>
          <Button style={s.timeButton} onPress={() => {
            dispatch(sumarPeriodo({id:user.id,dias:90,type:type,periodo:7}))
            setSendData("")
            }}>
            <Text style={s.textButton}>3 Meses</Text>
          </Button>
          <Button style={s.timeButton} onPress={() => {
            dispatch(sumarPeriodo({id:user.id,dias:182,type:type,periodo:30}))
             setSendData("")
            }}>
            <Text style={s.textButton}>6 Meses</Text>
          </Button>
        </View>
      </View>

    </View>
  );
};

export default Statistics;