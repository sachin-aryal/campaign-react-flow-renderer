import React, {Component} from 'react'
import ReactFlow, {Background} from 'react-flow-renderer'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Switch from 'react-switch'
import NumericInput from 'react-numeric-input'
import Input from './input'

function getNewX(index, x){
  if(index === 0) {
    return x
  }
  else if(index % 2 === 0){
    x -= 200
  }
  else{
    x += 200
  }
  x += (Math.random() < 0.5 ? -1 : 1)*15 // Shift node right or left randomly not to overlap on edge completely.
  return x
}


function CampaignRuleSwitch(props) {
  let { keyName, value, handleInputChange, alwaysEnabled } = props
  if (alwaysEnabled) {
    value = true
  }
  return (
      <div className='field-config-boolean'>
        <label>
          <Switch
              disabled={alwaysEnabled}
              onChange={val => handleInputChange(val, keyName)}
              checked={value}
          />
        </label>
      </div>
  )
}

function CampaignRuleIntegerArrayInput(props) {
  const { keyName, value, handleElementChange, handleAddElement, handleRemoveElement } = props

  return (
      <div className='field-config-integer-array'>
        <div>
          {value.map((number, index) => {
            return (
                <div key={index}>
                  {`${index + 1}. `}
                  <NumericInput
                      mobile
                      onChange={val => handleElementChange(index, val, keyName)}
                      value={number}
                  />
                </div>
            )
          })}
        </div>
        <div className='field-config-array-buttons'>
          <button
              type='button'
              className='field-config-array-button'
              onClick={() => handleRemoveElement(keyName)}
          >
            Remove Element
          </button>
          <div className={'field-config-button-divider'} />
          <button
              type='button'
              className='field-config-array-button'
              onClick={() => handleAddElement(keyName)}
          >
            Add Element
          </button>
        </div>
      </div>
  )
}

function CampaignRuleMapInput(props) {
  const { keyName, value, handlePairChange, handleAddPair, handleRemovePair } = props
  return (
      <div className='field-config-map'>
        <div>
          {value.map((pair, index) => {
            return (
                <div key={index}>
                  {`${index + 1}. `}
                  <CampaignRulePairInput
                      handlePairChange={handlePairChange}
                      handleRemovePair={handleRemovePair}
                      index={index}
                      keyName={keyName}
                      value={pair}
                  />
                </div>
            )
          })}
        </div>
        <div className='field-config-array-buttons'>
          <button
              type='button'
              className='field-config-map-add-button'
              onClick={() => handleAddPair(keyName)}
          >
            ADD
          </button>
        </div>
      </div>
  )
}

function CampaignRulePairInput(props) {
  const { index, keyName, value, handlePairChange, handleRemovePair } = props
  return (
      <div className='field-config-pair'>
        <label>
          K:{' '}
          <input
              type={'text'}
              onChange={val => handlePairChange(index, [val.target.value, value[1]], keyName)}
              value={value[0].toString()}
          />
          V:{' '}
          <input
              type={'text'}
              onChange={val => handlePairChange(index, [value[0], val.target.value], keyName)}
              value={value[1].toString()}
          />
          <button
              type='button'
              className='field-config-map-remove-button'
              onClick={() => handleRemovePair(index, keyName)}
          >
            REMOVE
          </button>
        </label>
      </div>
  )
}

function CampaignRuleIntegerInput(props) {
  const { keyName, value, handleInputChange } = props
  return (
      <div className='field-config-integer'>
        <label>
          <NumericInput mobile onChange={val => handleInputChange(val, keyName)} value={value} />
        </label>
      </div>
  )
}

function CampaignRuleStringInput(props) {
  const { keyName, value, handleInputChange, disabled } = props
  return (
      <div className='field-config-string'>
        <label>
          <Input
              handleChange={e => handleInputChange(e.target.value, keyName)}
              type={'text'}
              value={value}
              disabled={disabled}
          />
        </label>
      </div>
  )
}

function CampaignRuleTimestamp(props) {
  const { timestamp } = props
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  const date = new Date(timestamp)
  return (
      <div className={'rule-timestamp'}>
        {!isNaN(date.getMilliseconds()) ? (
            <label>{`${date.toLocaleDateString('en-US', options)}`}</label>
        ) : (
            'n/a'
        )}
      </div>
  )
}

function CampaignRuleStringArrayInput(props) {
  const {
    keyName,
    value,
    handleElementChange,
    handleAddElement,
    handleRemoveElement,
    handleRemoveElementInArray
  } = props

  return (
      <div className='field-config-string-array'>
        <div>
          {value.map((text, index) => {
            return (
                <div key={index}>
                  {`${index + 1}. `}
                  <Input
                      handleChange={e => handleElementChange(index, e.target.value, keyName)}
                      type={'text'}
                      value={text}
                  />
                  <button
                      type='button'
                      className='field-config-map-remove-button'
                      onClick={() => handleRemoveElementInArray(index, keyName)}
                  >
                    REMOVE
                  </button>
                </div>
            )
          })}
        </div>
        <div className='field-config-array-buttons'>
          <button
              type='button'
              className='field-config-array-button'
              onClick={() => handleRemoveElement(keyName)}
          >
            Remove Element
          </button>
          <div className={'field-config-button-divider'}></div>
          <button
              type='button'
              className='field-config-array-button'
              onClick={() => handleAddElement(keyName)}
          >
            Add Element
          </button>
        </div>
      </div>
  )
}

function shouldRemoveRuleEnableSwitch(fieldName, multipleSwitches) {
  return fieldName === 'enabled?' && multipleSwitches === true
}

function fieldForRule(
    campaignName,
    ruleName,
    fieldName,
    field,
    state,
    changeHandlers,
    alwaysEnabled
) {
  const keyName = [campaignName, ruleName, fieldName].join(':')
  const {
    handleInputChange,
    handleAddElement,
    handleRemoveElement,
    handleRemoveElementInArray,
    handleElementChange,
    handlePairChange,
    handleAddPair,
    handleRemovePair
  } = changeHandlers

  if (field.type === 'boolean') {
    return (
        <CampaignRuleSwitch
            keyName={keyName}
            handleInputChange={handleInputChange}
            value={state[keyName]}
            alwaysEnabled={alwaysEnabled}
        />
    )
  } else if (field.type === 'integer') {
    return (
        <CampaignRuleIntegerInput
            keyName={keyName}
            handleInputChange={handleInputChange}
            value={state[keyName]}
        />
    )
  } else if (field.type === 'map') {
    return (
        <CampaignRuleMapInput
            keyName={keyName}
            handleInputChange={handleInputChange}
            handlePairChange={handlePairChange}
            handleAddPair={handleAddPair}
            handleRemovePair={handleRemovePair}
            value={state[keyName]}
        />
    )
  } else if (field.type === 'integer_array') {
    return (
        <CampaignRuleIntegerArrayInput
            keyName={keyName}
            handleElementChange={handleElementChange}
            handleAddElement={handleAddElement}
            handleRemoveElement={handleRemoveElement}
            value={state[keyName]}
        />
    )
  } else if (field.type === 'string') {
    return (
        <CampaignRuleStringInput
            keyName={keyName}
            handleInputChange={handleInputChange}
            value={state[keyName]}
            disabled={field['is_disabled']}
        />
    )
  } else if (field.type === 'string_array') {
    return (
        <CampaignRuleStringArrayInput
            keyName={keyName}
            handleElementChange={handleElementChange}
            handleAddElement={handleAddElement}
            handleRemoveElement={handleRemoveElement}
            handleRemoveElementInArray={handleRemoveElementInArray}
            value={state[keyName]}
        />
    )
  } else if (field.type === 'timestamp') {
    return <CampaignRuleTimestamp timestamp={state[keyName]} keyName={keyName} />
  } else if (field.type === 'immutable_string') {
    return <div className={'rule-timestamp'}>{state[keyName]}</div>
  } else {
    return <div>Configuration for type {field.type} is not yet implemented.</div>
  }
}

function ruleConfigSection(
    campaignName,
    ruleName,
    rule,
    state,
    changeHandlers,
    alwaysEnabled,
    multiple_switches
) {
  return Object.keys(rule.config).map((fieldName, index) =>
      shouldRemoveRuleEnableSwitch(fieldName, multiple_switches) ? null : (
          <div key={[campaignName, ruleName, fieldName].join(':')} className='field-config'>
            <div className={`field-config-heading ${fieldName}`}>{fieldName}</div>
            {fieldForRule(
                campaignName,
                ruleName,
                fieldName,
                rule.config[fieldName],
                state,
                changeHandlers,
                alwaysEnabled
            )}
          </div>
      )
  )
}

const getFieldNameKey = (keyName, fieldName) => {
  return keyName.split(new RegExp('(?<!:):(?!:)')).slice(0, 2).concat(fieldName).join(':')
}

function stateToJson(state) {
  let value = {}
  for (let configKey in state) {
    // Use regex object instead of literal because lookbehind is invalid according to webpack.
    let parts = configKey.split(new RegExp('(?<!:):(?!:)'))
    if (parts.length !== 3) {
      continue
    }
    let [campaignName, ruleName, fieldName] = parts
    if (!value[campaignName]) {
      value[campaignName] = {}
    }
    if (!value[campaignName][ruleName]) {
      value[campaignName][ruleName] = {}
    }

    value[campaignName][ruleName][fieldName] = state[configKey]
  }

  return JSON.stringify(value)
}


class CampaignGraph extends Component {

  handleInputChange = (value, keyName) => {
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    this.setState({
      [keyName]: value,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  handleAddElement = keyName => {
    let arrayVals = this.state[keyName]
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    arrayVals.push(0)
    this.setState({
      [keyName]: arrayVals,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  handleRemoveElement = keyName => {
    let arrayVals = this.state[keyName]
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    arrayVals.pop()
    this.setState({
      [keyName]: arrayVals,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  handleRemoveElementInArray = (index, keyName) => {
    let arrayVals = this.state[keyName]
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    arrayVals.splice(index, 1)
    this.setState({
      [keyName]: arrayVals,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  handleElementChange = (index, val, keyName) => {
    let arrayVals = this.state[keyName]
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    arrayVals[index] = val
    this.setState({
      [keyName]: arrayVals,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  handleAddPair = keyName => {
    let arrayVals = this.state[keyName]
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    arrayVals.push(['', ''])
    this.setState({
      [keyName]: arrayVals,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  handleRemovePair = (index, keyName) => {
    let arrayVals = this.state[keyName]
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    arrayVals.splice(index, 1)
    this.setState({
      [keyName]: arrayVals,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  handlePairChange = (index, val, keyName) => {
    let arrayVals = this.state[keyName]
    const updated_by_key = getFieldNameKey(keyName, 'updated_by')
    const updated_at_key = getFieldNameKey(keyName, 'updated_at')
    arrayVals[index] = val
    this.setState({
      [keyName]: arrayVals,
      [updated_by_key]: this.state.current_user,
      [updated_at_key]: Date.now()
    })
  }

  constructor(props) {
    super(props)
    let data = props.state
    data['flow_open'] = false
    data['scroll'] = 'paper'
    data['graph_elements'] = []
    data['temp_elements'] = []
    data['child_popup_open'] = false
    this.state = data
    this.changeHandlers = {
      handleInputChange: this.handleInputChange,
      handleAddElement: this.handleAddElement,
      handleRemoveElement: this.handleRemoveElement,
      handleRemoveElementInArray: this.handleRemoveElementInArray,
      handleElementChange: this.handleElementChange,
      handleAddPair: this.handleAddPair,
      handleRemovePair: this.handleRemovePair,
      handlePairChange: this.handlePairChange
    }
  }

  handleClose = () => {
    this.setState({ flow_open: false })
  }

  handleChildClose = () => {
    this.setState({ child_popup_open: false })
  }

  openConfigEditor = (campaignName, ruleName, rule) => {
    this.setState({ child_popup_open: true, rule_name: ruleName, rule: rule })
  }

  createNode(ruleName, className, x, y, style, ruleLabel, index, campaignName, rule){
    return {
      id: ruleName,
      type: 'input',
      data: { label: (<><span onClick={() => this.openConfigEditor(campaignName, ruleName, rule)} className={className}>{ruleLabel}</span></>) },
      position: { x: x, y: y },
      style: style
    }
  }

  createOutputNode(reject = false, count = 1, x, y){
    let type = reject === true ? "reject": "exit"
    return {
      id: type+'_'+count,
      type: 'output',
      data: { label: type.charAt(0).toUpperCase() + type.slice(1)},
      position: { x: x, y: y + 200 },
      style: {
        background: reject === true ? '#a54e4e': '#3fad8e',
        color: '#ffffff',
        border: 'none'
      }
    }
  }

  createEdge(source, target, label, yes=false){
    let color = yes ? "green": "blue"
    return { id: 'e_'+source+"_"+target, source: source, target: target, label: label, arrowHeadType: 'arrowclosed', labelStyle: { fontSize: '13', fill: color, fontWeight: 700 }}
  }

  graphElements(){
    let tempElements = []
    let y = 25
    let x = 550
    let rejectsCount = 0
    let exitCount = 0
    let index = 0

    for (const [ruleName, value] of Object.entries(this.props.rules)) {
      if(ruleName === 'reject'){
        continue
      }
      let yes = value['yes']
      let no = value['no']
      let yesLabel = yes === value['default_child_rule'] ? "YES/DEFAULT" : "YES"
      let noLabel = no === value['default_child_rule'] ? "NO/DEFAULT" : "NO"
      let nodeBackground = "red"
      let borderRadius = "25px"
      let className = ""
      if((yes === "exit" && no === "reject") || (yes === "reject" && no === "exit")){
        borderRadius = ""
      }
      let campaignName= this.props.campaignName
      let stateKey = [campaignName, ruleName, "enabled?"].join(':')
      if(value['always_enabled'] === true || this.state[stateKey] === true){
        nodeBackground = "green"
      }
      let style = {
        border: 'none',
        borderRadius: borderRadius,
        background: nodeBackground,
        color: "#ffffff",
        fontSize: "15px"
      }
      let ruleLabel = value['label']
      let wh = 150
      if(ruleName.endsWith("?")){
        wh = ruleLabel.length < 28 ? 140: ruleLabel.length * 5
        style['clipPath'] = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
        style['height'] = wh
        style['width'] = wh
        className = "nodeText"
      }
      let tempX = getNewX(index, x)
      tempElements.push(this.createNode(ruleName, className, tempX, y, style, ruleLabel, index, campaignName, value))
      let outputX = index % 2 === 0 ? tempX - 300 :  tempX += 300
      let reject = false

      // Creating target reject node
      if(yes === "reject" || no === "reject"){
        rejectsCount += 1
        tempElements.push(this.createOutputNode(true, rejectsCount, outputX, y))
        if(yes === "reject"){
          yes = 'reject_'+rejectsCount
        }else{
          no = 'reject_'+rejectsCount
        }
        reject = true
      }

      // Creating target exit node
      if(yes === "exit" || no === "exit"){
        if(reject){
          outputX += 500
        }
        exitCount += 1
        tempElements.push(this.createOutputNode(false, exitCount, outputX, y))
        yes === "exit" ? yes = 'exit_'+exitCount : no = 'exit_'+exitCount
      }
      tempElements.push(this.createEdge(ruleName, yes, yesLabel, true))
      tempElements.push(this.createEdge(ruleName, no, noLabel))
      wh *= 1.4
      y += wh
      index += 1
    }
    return tempElements
  }

  openDialogue = () => {
    this.setState({ flow_open: true })
  }


  render() {
    const childPopupOpen = this.state.child_popup_open;
    return (
        <div>
          {childPopupOpen ? (
              <div className='campaign-flow-box'>
                <Dialog
                    open={this.state.child_popup_open}
                    onClose={this.handleChildClose}
                    scroll={this.state.scroll}
                    aria-labelledby='scroll-dialog-title'
                    fullWidth={true}
                    maxWidth={"md"}
                >
                  <DialogTitle id='scroll-dialog-title' className='text-center'>
                    <span>{this.props.campaignConfigHeading}</span>
                  </DialogTitle>
                  <DialogContent>
                    <div>
                      {ruleConfigSection(
                          this.props.campaignName,
                          this.state.rule_name,
                          this.state.rule,
                          this.state,
                          this.changeHandlers,
                          this.state.rule['always_enabled'],
                          this.state.rule['multiple_switches']
                      )}
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleChildClose} color='primary'>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
          ) : null}
          <input type='hidden' name={this.props.name} value={stateToJson(this.state)} />
          <div className='campaign-flow-box'>
            <Button className="btn btn-info" onClick={this.openDialogue} color='primary'>
              Campaign Graph
            </Button>
            <Dialog
                open={this.state.flow_open}
                onClose={this.handleClose}
                scroll={this.state.scroll}
                aria-labelledby='scroll-dialog-title'
                fullWidth={true}
                maxWidth={"lg"}
            >
              <DialogTitle id='scroll-dialog-title' className='text-center'>
                <span>{this.props.campaignConfigHeading}</span>
              </DialogTitle>
              <DialogContent>
                <div style={{ height: 800}}>
                  <ReactFlow elements={this.graphElements()} snapToGrid={true} snapGrid={[15, 15]} zoomOnScroll={false}>
                    <Background color="#000000" gap={16} />
                  </ReactFlow>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='primary'>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
    )
  }
}

export default CampaignGraph
