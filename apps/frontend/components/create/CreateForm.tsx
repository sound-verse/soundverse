import LoadingModal from '../common/modals/LoadingModal'
import ToggleSwitch from '../common/ToggleSwitch'
import useCreateERC1155 from '../../hooks/contracts/useCreateERC1155'
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import { Fragment, useRef, useState } from 'react'
import ValidationError from './ValidationError'

//using radio buttons for royalty %
const royaltyOptions = [
  { key: '10%', value: '10' },
  { key: '15%', value: '15' },
  { key: '30%', value: '30' },
]
const initialValues = {
  file: false,
  name: '',
  description: '',
  tags: [''],
  price: 0,
  switch: false,
  royaltyPercent: '',
  editions: 0,
}
const validationSchema = Yup.object({
  file: Yup.bool()
    .required('Please upload your file')
    .oneOf([true], 'Please upload your file'),
  name: Yup.string().required('Please enter a title'),
  price: Yup.number()
    .typeError('Please enter a valid numeric amount')
    .min(0.01, 'Minimum value of .01 ETH')
    .required('Please enter a valid numeric amount'),
  royaltyPercent: Yup.string().required('Please choose one'),
  editions: Yup.number()
    .typeError('Please enter a number')
    .min(1, 'Minimum 1 edition')
    .required('Please enter a number'),
})

const onSubmit = (values, onSubmitProps) => {
  console.log('Form Accepted!', values)

  //await form submission accepted

  onSubmitProps.setSubmitting(false)
}
export default function CreateForm() {
  const [showing, setShowing] = useState<Boolean>(false)
  const modalOnClick = () => setShowing(false)
  const [file, setSubmittedFile] = useState(null)

  // const [handleMintClick, mintState] = useCreateERC1155(
  //   file,
  //   name,
  //   description,
  //   setShowing

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount={true}
      >
        {(formik) => {
          console.log(formik)
          return (
            <Form>
              <div>
                <h3 className="text-lg font-bold my-1">Preview</h3>
                <div>
                  Upload a moment of of your live set where you played a piece
                  of unpublished music!
                </div>
                <div className="flex">
                  <div>Live Video Moment</div>
                  <div>Add album covers</div>
                </div>
              </div>

              <div className="my-5 ">
                <h3 className="text-lg font-bold my-1">
                  Unlock once purchased
                </h3>
                <div>
                  Content will be unlocked after a successful transaction
                </div>
                <div>* - Indicates Required Field</div>
                <div className="my-2">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => {
                      /*Formik has no built in way to handle file types
                      so we set the file property to true when a user submits a file
                      and store the value in state*/
                      setSubmittedFile(e.target.files[0])
                      formik.setFieldValue('file', true)
                      console.log(e.target.files[0])
                    }}
                  ></input>
                </div>
                <div className="my-2">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Title*"
                    name="name"
                  />
                </div>
                <div className="my-2">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Track Description"
                    name="description"
                  />
                </div>
                <div className="my-2 ">
                  <label>Tags</label>
                  <FieldArray name="tags">
                    {(fieldArrayProps) => {
                      // console.log('Field Array Props', fieldArrayProps)
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { tags } = values
                      return (
                        <div>
                          {tags.map((tag, index) => (
                            <div key={index} className="text-black">
                              <Field name={`tags[${index}]`}></Field>
                              {index > 0 && (
                                <button
                                  className="text-white"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Delete
                                </button>
                              )}
                              {index === 0 && (
                                <button
                                  type="button"
                                  className="text-white"
                                  onClick={() => push('')}
                                >
                                  Add Tag
                                </button>
                              )}

                              <br></br>
                            </div>
                          ))}
                        </div>
                      )
                    }}
                  </FieldArray>
                </div>
              </div>

              <div className="my-5">
                <h3 className="text-lg font-bold my-1">Copyright ownership</h3>
                <div>
                  I certify that I own 100% of the copyright on this unpublished
                  track and I agree with Linifty terms and coniditions.{' '}
                </div>
              </div>
              {showing ? (
                <LoadingModal onClick={modalOnClick}></LoadingModal>
              ) : null}

              <div className="my-5">
                <h3 className="text-lg font-bold my-1">
                  Engage with your fans and maximise your marketing potential
                </h3>
                <div>
                  <div>
                    In the near future we are planning to allow artists to sell
                    a portion of their unpublished tracks copyright as an NFT to
                    their fans. This bring artists and their fans closer than
                    ever and allows both to benefit from each other. You can
                    read more about this here in our article.{' '}
                  </div>
                  <div className="mt-3">
                    In the case of this feature release are you willing to allow
                    people who collected this NFT take part in a live auction
                    event where they can buy portion of this tracks copyright?{' '}
                  </div>
                  <div
                    onChange={() => {
                      const { values } = formik
                      values.switch = !values.switch
                    }}
                  >
                    <Field
                      type="checkbox"
                      name="switch"
                      component={ToggleSwitch}
                    ></Field>
                  </div>
                </div>
              </div>

              <div className="my-5">
                <div>
                  Enter a price to allow users instantly purchase your NFT
                </div>
                <div className="my-3 flex">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Price*"
                    name="price"
                  />
                  <br></br>
                  ETH
                </div>
                <div>
                  Service fee: 5% <br />
                  {formik.values.price &&
                    !isNaN(formik.values.price) &&
                    `You will recieve ${formik.values.price * 0.95} ETH`}
                </div>
              </div>

              <div className="my-5">
                <div className="flex">
                  <div>
                    <FormikControl
                      control="radio"
                      label="Royalty Percentage*"
                      name="royaltyPercent"
                      options={royaltyOptions}
                    />
                  </div>
                  <div className="ml-10">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Number of Editions*"
                      name="editions"
                    />
                  </div>
                </div>
              </div>

              <div className="my-5">
                <h3 className="text-lg font-bold my-1">Royalty Partners</h3>
              </div>

              <button
                className={
                  formik.isSubmitting || !formik.isValid
                    ? 'bg-white text-gray-400 mb-8 w-44 h-8 text-md font-bold border border-white'
                    : 'createBtn mb-8 w-44 h-8 text-md font-bold border border-white rounded-xl'
                }
                disabled={!formik.isValid || formik.isSubmitting}
                type="submit"
              >
                Create the package
              </button>
            </Form>
          )
        }}
      </Formik>
      <style jsx>{`
        div {
          color: #ede7f6;
        }
        h3 {
          color: #ede7f6;
        }
        .chooseBtn {
          background: #6200ea;
        }
        .createBtn {
          background: #6200ea;
        }
      `}</style>
    </Fragment>
  )
}
