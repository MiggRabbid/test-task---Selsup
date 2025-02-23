import React from 'react';
import {
  Box,
  Button,
  createTheme,
  FormLabel,
  List,
  ListItem,
  Paper,
  TextField,
  ThemeProvider,
} from '@mui/material';

/** ----- ТИПИЗАЦИЯ */
/**
 * Перечисление ParamType используется как тип input. Сделано для расширения типов параметров.
 * Например:
 * enum ParamType {
 *   String = 'text',
 *   Number = 'number',
 *   Date = 'date',
 * }
 */
// eslint-disable-next-line no-shadow, no-unused-vars
enum ParamType {
  // eslint-disable-next-line no-unused-vars
  String = 'text',
}

type Color = string;

interface Param {
  id: number;
  name: string;
  type: ParamType;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  params: Param[];
  paramValues: ParamValue[];
  colors: Color[];
}

interface ParamListProps {
  params: Param[];
  paramValues: ParamValue[];
  // eslint-disable-next-line no-unused-vars
  onParamValueChange: (paramId: number, newValue: string) => void;
}
interface ModelListProps {
  onClick: () => Model;
}

interface ModelListState {
  model: Model | null;
}

/** ----- Компоненты */
class ParamList extends React.Component<ParamListProps> {
  render() {
    const { params, paramValues, onParamValueChange } = this.props;
    return (
      <List className="w-full flex flex-col">
        {params.map((param) => {
          const paramValue = paramValues.find((pv) => pv.paramId === param.id);
          return (
            <ListItem key={param.id} className="w-full flex flex-row gap-5">
              <FormLabel className="w-40 text-gray-950! font-semibold!" color="primary">
                {param.name}
              </FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={paramValue?.value || ''}
                onChange={(e) => onParamValueChange(param.id, e.target.value)}
              />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

class ModelList extends React.Component<ModelListProps, ModelListState> {
  constructor(props: ModelListProps) {
    super(props);
    this.state = {
      model: null,
    };
  }

  handleGetModel = () => {
    const model = this.props.onClick();
    if (!!model) this.setState({ model });
  };

  render() {
    const { model } = this.state;

    return (
      <List className="w-1/2 flex flex-col ga">
        <Box className="w-full flex flex-row justify-between items-center">
          <Box>
            {!model && (
              <h3 className="text-xl">Нажмите "getModel()" для отображения модели</h3>
            )}
            {!!model && <h3 className="text-xl">Все заданные значения параметров</h3>}
          </Box>
          <Button
            variant="contained"
            className="w-40 bg-gray-950!"
            onClick={this.handleGetModel}
          >
            getModel()
          </Button>
        </Box>

        {model ? (
          <Box className="mt-4">
            <h4>Параметры:</h4>
            <List>
              {model.paramValues && model.paramValues.length > 0 ? (
                <>
                  {model.paramValues.map((value) => (
                    <ListItem key={value.paramId} className="w-full flex flex-row gap-5">
                      <p>Параметр №{value.paramId}:</p>
                      <p className="font">{value.value}</p>
                    </ListItem>
                  ))}
                </>
              ) : (
                <ListItem>
                  <p>Нет заданных параметров</p>
                </ListItem>
              )}
            </List>

            <h4 className="mt-1">Цвета:</h4>
            <List>
              {model.colors && model.colors.length > 0 ? (
                <>
                  {model.colors.map((color, index) => (
                    <ListItem key={index}>{color}</ListItem>
                  ))}
                </>
              ) : (
                <ListItem>
                  <p>Нет заданных цветов</p>
                </ListItem>
              )}
            </List>
          </Box>
        ) : (
          <ListItem>
            <p></p>
          </ListItem>
        )}
      </List>
    );
  }
}

class ParamEditor extends React.Component<Props, State> {
  private newParamRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      params: props.params,
      paramValues: props.model.paramValues,
      colors: props.model.colors,
    };
  }

  // Сделал стрелочной функцией, чтобы this ссылался на экземпляр класса ParamEditor,
  // и не был undefined в дочерних компонентах
  public getModel = (): Model => {
    return {
      paramValues: this.state.paramValues.filter((item) => item.value.length > 0),
      colors: this.state.colors.filter((item) => item.length > 0),
    };
  };

  handleParamValueChange = (paramId: number, newValue: string) => {
    this.setState((prevState) => {
      const updatedValues = prevState.paramValues.map((pv) =>
        pv.paramId === paramId ? { ...pv, value: newValue } : pv,
      );
      return { paramValues: updatedValues };
    });
  };

  // Возможность добавлять и новые параметры.
  // Также сюда можно добавить селект, чтобы выбирать тип нового параметра.
  addNewParam = () => {
    const newParamName = this.newParamRef.current?.value.trim() || '';
    if (!newParamName) return;
    const lastId = this.state.params[this.state.params.length - 1]?.id || 0;
    const newId = lastId + 1;

    const newParam: Param = {
      id: newId,
      name: newParamName,
      type: ParamType.String,
    };

    const newParamValue: ParamValue = {
      paramId: newId,
      value: '',
    };

    this.setState((prevState) => ({
      params: [...prevState.params, newParam],
      paramValues: [...prevState.paramValues, newParamValue],
    }));

    if (this.newParamRef.current) {
      this.newParamRef.current.value = '';
    }
  };

  render() {
    return (
      <>
        <Paper className="w-1/2 h-fit min-h-96 p-3.5 flex flex-col justify-between gap-9 shadow-lg!">
          <ParamList
            params={this.state.params}
            paramValues={this.state.paramValues}
            onParamValueChange={this.handleParamValueChange}
          />

          <Box className="w-full flex flex-row gap-5">
            <TextField
              fullWidth
              className="text-gray-950! border-amber-50!"
              variant="outlined"
              label="Новый параметр"
              inputRef={this.newParamRef}
            />
            <Button
              variant="contained"
              className="w-40 bg-gray-950!"
              onClick={this.addNewParam}
            >
              Добавить
            </Button>
          </Box>
        </Paper>

        <ModelList onClick={this.getModel} />
      </>
    );
  }
}

/** ----- Начальные параметры */
const initialParams: Param[] = [
  { id: 1, name: 'Назначение', type: ParamType.String },
  { id: 2, name: 'Длина', type: ParamType.String },
];

const initialModel: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [],
};

/** ----- Начальные параметры */
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            color: '#1d293d',
            borderColor: '#1d293d',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#1d293d',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#1d293d',
          },
        },
      },
    },
  },
});

/** ----- App */
const App = () => (
  <ThemeProvider theme={theme}>
    <Box className="pt-10 pb-20 flex flex-col justify-start items-center gap-9">
      <h1 className="text-4xl font-bold uppercase">Редактор параметров</h1>
      <ParamEditor params={initialParams} model={initialModel} />
    </Box>
  </ThemeProvider>
);

export default App;
