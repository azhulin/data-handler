import { Error } from "@azhulin/data-validator"
import ErrorDataInternalFormat from "./error/ErrorDataInternalFormat"

export default {
  ...Error,
  InternalFormat: ErrorDataInternalFormat,
}
