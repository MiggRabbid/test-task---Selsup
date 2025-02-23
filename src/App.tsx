import { Box } from '@mui/material';
import React, { ChangeEvent } from "react";
/**
 * Перечисление ParamType используется как тип input.
 * Сделано для расширения типов параметров.
 * Например:
 * enum ParamType {
 *   String = 'text',
 *   Number = 'number',
 *   Date = 'date',
 * }
 */
enum ParamType {
  String = "text",
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
  colors?: Color[] | [];
}

class ParamEditor extends React.Component<Props, State> {
  public getModel() {
  }
  }

const App= () => (
  <Box>
  </Box>
);

export default App;
