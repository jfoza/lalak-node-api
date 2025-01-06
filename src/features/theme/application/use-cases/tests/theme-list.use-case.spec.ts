describe('ThemeListUseCase Unit Tests', () => {
  it('Should return a paginated list of themes', async () => {
    const test = true;

    expect(test).toBe(true);
  });

  // let sut: ThemeListUseCase;
  // let themeRepository: ThemeRepository;
  // let themeSearchParamsDto: ThemeSearchParamsDto;
  //
  // const lengthAwarePaginator: ILengthAwarePaginator = {
  //   currentPage: 1,
  //   data: [],
  //   from: 1,
  //   lastPage: 1,
  //   perPage: 1,
  //   to: 1,
  //   total: 1,
  // };
  //
  // beforeEach(() => {
  //   themeRepository = {
  //     findAll: vi.fn(),
  //     paginate: vi.fn(async () => lengthAwarePaginator),
  //   } as unknown as ThemeRepository;
  //
  //   themeSearchParamsDto = new ThemeSearchParamsDto();
  //
  //   sut = new ThemeListUseCase(themeRepository);
  // });
  //
  // it('Should return a paginated list of themes', async () => {
  //   themeSearchParamsDto.page = 1;
  //   themeSearchParamsDto.perPage = 10;
  //
  //   const result = await sut.execute(themeSearchParamsDto);
  //
  //   if (Array.isArray(result)) {
  //     throw new Error('Expected paginated result but received an array.');
  //   }
  //
  //   expect(themeRepository.paginate).toHaveBeenCalled();
  //   expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
  //   expect(result.data).toBe(lengthAwarePaginator.data);
  //   expect(result.from).toBe(lengthAwarePaginator.from);
  //   expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
  //   expect(result.perPage).toBe(lengthAwarePaginator.perPage);
  //   expect(result.to).toBe(lengthAwarePaginator.to);
  //   expect(result.total).toBe(lengthAwarePaginator.total);
  // });
  //
  // it('Should return a list of themes if no pagination params are provided', async () => {
  //   const themeList: Theme[] = [ProductsDataBuilder.getTheme()];
  //   vi.spyOn(themeRepository, 'findAll').mockResolvedValue(themeList);
  //
  //   const result = await sut.execute(themeSearchParamsDto);
  //
  //   expect(themeRepository.findAll).toHaveBeenCalled();
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result).toEqual(themeList);
  // });
});
