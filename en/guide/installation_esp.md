# Installation (Espressif Component)

**EasyTier-ESP** is a lightweight C++ implementation based on the EasyTier networking protocol and can be imported as a component in ESP-IDF.

## Import via the ESP-IDF Component Registry

Add the dependency to your application's `main/idf_component.yml`:

```yaml
dependencies:
  myqfeng/easytier-esp: "^0.0.1"
  idf: ">=6.1"
```

Or use the command:

```bash
idf.py add-dependency "myqfeng/easytier-esp^0.0.1"
idf.py build
```

The component will be downloaded to the project's `managed_components/` directory during the build.

### Import from Local Source

- Copy or symlink `components/easytier-esp` to your application's `components/` directory; or
- Add this repository's `components` directory to `EXTRA_COMPONENT_DIRS` in the project's top-level `CMakeLists.txt`.

Then declare the dependency in your application component's `CMakeLists.txt`:

```cmake
idf_component_register(
    SRCS "main.cpp"
    INCLUDE_DIRS "."
    REQUIRES easytier-esp
)
```
